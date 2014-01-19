app.controller('ItemController', ['$scope', 'listener', 'pouchWrapper', 'itemsShare', function($scope, listener, pouchWrapper, itemsShare) {

    $scope.items = [];
    $scope.newItem = {};
    
    $scope.docType = 'item';

    $scope.addItem = function() {
        var doc = {
            make: $scope.newItem.make,
            model: $scope.newItem.model,
            bidNote: $scope.newItem.bidNote,
            quantityChange: $scope.newItem.quantityChange,
            source: $scope.newItem.source,
            purpose: $scope.newItem.purpose
        };
    
        var promise = pouchWrapper.add(doc, $scope.docType);
        promise.then(function(res) {
            // Clear newitems
            
            $scope.newItem.make = '';
            $scope.newItem.model = '';
            $scope.newItem.bidNote = '';
            $scope.newItem.quantityChange = '';
            $scope.newItem.source = '';
            $scope.newItem.purpose = '';
            
            
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
            $scope.items.push(doc);
            itemsShare.addItem({id: doc._id, name: doc.make + " " + doc.model});
        }
    });

    $scope.$on('delDoc', function(event, id) {
        for (var i = 0; i<$scope.items.length; i++) {
            if ($scope.items[i]._id === id) {
                $scope.items.splice(i,1);
            }
        }
        itemsShare.delItem(id);
    });

}]);

