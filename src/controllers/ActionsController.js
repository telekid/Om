app.controller('ActionsController', ['$scope', 'listener', 'pouchWrapper', 'itemsShare', function($scope, listener, pouchWrapper, itemsShare) {

    $scope.items = [];
    
    // Initialize all values in newItem to prevent items from disappearing from
    // the list upon filtering
    $scope.newItem = {
        make: '',
        model: '',
        bidNote: '',
        quantityChange: '',
        source: '',
        purpose: ''
    };
    
    $scope.highlightedRow = null;
    
    $scope.docType = 'item';

    $scope.addItem = function() {
        var doc = {
            timestamp: Date.now(),
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

    $scope.keyWatcher = function(event) {
        if (event.ctrlKey == true) {
            if (event.keyCode >= 48 && event.keyCode <= 57) {
                console.log($scope.highlightedRow);
                $scope.selectRow(event.keyCode - 48);
            }
        }
        
    };
    
    
    $scope.selectRow = function(row) {
        $scope.highlightedRow = row;
    };
//    $scope.comboFilter = function(item, )
}]);

