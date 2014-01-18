app.controller('ItemController', ['$scope', '$log', 'listener', 'pouchWrapper', function($scope, $log, listener, pouchWrapper) {

    $scope.$log = $log;

    $scope.items = [];
    
    
    $scope.docType = 'item';

    $scope.addItem = function() {
        var newItem = {
            make: $scope.newItem.make,
            model: $scope.newItem.model,
        };
    
        //look at this later!
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
        pouchWrapper.remove(id).then(function(res) {
        }, function(reason) {
            console.log(reason);
        })
    };


    $scope.$on('newDoc', function(event, doc) {
        console.log('new ' + doc.type);

        if (doc.type === $scope.docType) {
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

