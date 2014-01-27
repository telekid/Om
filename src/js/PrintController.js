app.controller('InventoryPrintViewController', ['$scope', 'listener', 'pouchWrapper', 'itemsShare', function($scope, listener, pouchWrapper, itemsShare) {

    $scope.docType = 'item';

    $scope.remove = function(id) {
        var promise = pouchWrapper.remove(id);
        promise.then(function(res) {
        }, function(reason) {
            console.log(reason);
        })
    };

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

