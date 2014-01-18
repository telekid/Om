app.controller('BidItemController', ['$scope', '$log', 'listener', 'pouchWrapper', function($scope, $log, listener, pouchWrapper) {

    $scope.$log = $log;

    $scope.bidItems = [];
    
    $scope.docType = 'bidItem';

    $scope.addBidItem = function() {
        var newBidItem = {
            item: $scope.newBidItem.item,
            notes: $scope.newBidItem.notes,
            quantity: $scope.newBidItem.quantity,
            source: $scope.newBidItem.source
        };
    
        pouchWrapper.add(newBidItem, $scope.docType).then(function(res) {
            // Clear newitems fields
            $scope.newBidItem.item = '';
            $scope.newBidItem.notes = '';
            $scope.newBidItem.quantity = '';
            $scope.newBidItem.source = '';
            
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
            $scope.bidItems.push(doc);
        }
    });

    $scope.$on('delDoc', function(event, id) {
        for (var i = 0; i<$scope.bidItems.length; i++) {
            if ($scope.bidItems[i]._id === id) {
                $scope.bidItems.splice(i,1);
            }
        }
    });

}]);

