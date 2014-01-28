angular.module('Om',
  ['ngRoute',
   'Om.filters',
   'Om.directives',
   'Om.services',
   'Om.config',
   'Om.controllers'
  ])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/actions', {
        templateUrl: 'partials/actions.html',
        controller: 'ActionsController'
      }).
      when('/print', {
        templateUrl: 'partials/print.html',
        controller: 'PrintController'
      }).
      otherwise({
        redirectTo: '/actions'
      });
  }]);


