app.controller('ItemController', ['$scope', 'listener', 'pouchWrapper', function($scope, listener, pouchWrapper) {

    $scope.items = [];
    
    $scope.docType = 'item';

    $scope.addItem = function() {
        var newItem = {
            make: $scope.newItem.make,
            model: $scope.newItem.model
        };
    
        var promise = pouchWrapper.add(newItem, $scope.docType);
        promise.then(function(res) {
            // Clear newitems
            $scope.newItem.make = '';
            $scope.newItem.model = '';
        }, function(reason) {
            console.log(reason);
        })
    };

    $scope.remove = function(id) {
        var promise = pouchWrapper.remove(id);
        promise.then(function(res) {
        }, function(reason) {
            console.log(reason);
        })
    };

    $scope.$on('newDoc', function(event, doc) {

        if (doc.type === $scope.docType) {
            console.log('new ' + doc.type + ':');
            console.dir(doc);
            $scope.items.push(doc);
        }
    });

    $scope.$on('delDoc', function(event, id) {
        for (var i = 0; i<$scope.items.length; i++) {
            if ($scope.items[i]._id === id) {
                $scope.items.splice(i,1);
            }
        }
    });

}]);

