angular.module('Om.controllers')
    .controller('PrintController', ['$scope', 'database', function($scope, database) {
        $scope.actions = function() {
            // Filtering by action type should happen here
            return database.container();
        }
    }]);

