angular.module('Om.controllers')
    .controller('ActionsController', ['$scope', 'listener', 'pouchWrapper', function($scope, listener, pouchWrapper, itemsShare) {

        $scope.actions = [];   
        
        // Initialize all values in newAction to prevent items from disappearing from
        // the list upon filtering
        $scope.newAction = {
            make: '',
            model: '',
            bidNote: '',
            quantityChange: '',
            source: '',
            purpose: ''
        };
        
        $scope.highlightedRow = null;
        
        $scope.docType = 'action';

        $scope.addAction = function() {
            var doc = {
                timestamp: Date.now(),
                make: $scope.newAction.make,
                model: $scope.newAction.model,
                bidNote: $scope.newAction.bidNote,
                quantityChange: $scope.newAction.quantityChange,
                source: $scope.newAction.source,
                purpose: $scope.newAction.purpose
            };
        
            var promise = pouchWrapper.add(doc, $scope.docType);
            promise.then(function(res) {
                // Clear newActions
                
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
            var promise = pouchWrapper.remove(id);
            promise.then(function(res) {
            }, function(reason) {
                console.log(reason);
            })
        };

        $scope.getAll = function() {
            var promise = pouchWrapper.getAll();
            promise.then(function(res) {

                for (var i = 0; i<res.rows.length; i++) {
                    
                    $scope.actions.push(res.rows[i].doc);

                }
                console.log($scope.actions);
            }, function(reason) {
                console.log(reason);
            })
        }

        $scope.getAll();

        $scope.$on('newDoc', function(event, doc) {

            if (doc.type === $scope.docType) {
                $scope.actions.push(doc);
            }
        });

        $scope.$on('delDoc', function(event, id) {
            for (var i = 0; i<$scope.actions.length; i++) {
                if ($scope.actions[i]._id === id) {
                    $scope.actions.splice(i,1);
                }
            }
        });

        $scope.$on('selectRow', function(event, row) {
            $scope.highlightedRow = row;
        });

        $scope.selectRow = function(row) {
            $scope.highlightedRow = row;
        };
    //    $scope.comboFilter = function(item, )
    }]);

