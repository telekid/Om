angular.module('Om.controllers', ['Om.services'])
    .controller('AppController', ['$rootScope', '$scope', 'listener', function($rootScope, $scope, listener) {

        $scope.keyWatcher = function(event) {
            if (event.ctrlKey == true) {
                if (event.keyCode >= 48 && event.keyCode <= 57) {
                    $rootScope.$broadcast('selectRow', event.keyCode - 48);
                }
            }  
        };

    }]);


