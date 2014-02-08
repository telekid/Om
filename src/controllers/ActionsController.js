angular.module('Om.controllers')
    .controller('ActionsController', ['$scope', 'database', function($scope, database) {

        // Initialize all values in newAction to prevent items from disappearing from
        // the list upon filtering
        $scope.newAction = {
            category: '',
            make: '',
            model: '',
            bidNote: '',
            quantityChange: '',
            source: '',
            purpose: ''
        };
        
        $scope.highlightedRow = null;
        
        $scope.docType = 'action';

        $scope.actions = function() {
            // Filtering by action type should happen here
            return database.container();
        }

        $scope.addAction = function() {
            var doc = {
                timestamp: Date.now(),
                category: $scope.newAction.category,
                make: $scope.newAction.make,
                model: $scope.newAction.model,
                bidNote: $scope.newAction.bidNote,
                quantityChange: $scope.newAction.quantityChange,
                source: $scope.newAction.source,
                purpose: $scope.newAction.purpose
            };
            
            // Validation
            if (doc.quantityChange === "") {
                doc.quantityChange = 1;
            }


            var promise = database.add(doc, $scope.docType);
            promise.then(function(res) {
                // Clear newActions
                
                $scope.newAction.category = '';
                $scope.newAction.make = '';
                $scope.newAction.model = '';
                $scope.newAction.bidNote = '';
                $scope.newAction.quantityChange = '';
                $scope.newAction.source = '';
                $scope.newAction.purpose = '';
                
                
            }, function(reason) {
                console.log(reason);
            })
        };

        $scope.removeAction = function(id) {
            var promise = database.remove(id);
            promise.then(function(res) {
            }, function(reason) {
                console.log(reason);
            })
        };

        $scope.$on('selectRow', function(event, row) {
            $scope.highlightedRow = row;
        });

        $scope.selectRow = function(row) {
            $scope.highlightedRow = row;
        };
    //    $scope.comboFilter = function(item, )
    }]);

