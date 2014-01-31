angular.module('Om',
  ['ngRoute',
   'Om.filters',
   'Om.directives',
   'Om.services',
   'Om.controllers'
  ])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/actions', {
        templateUrl: 'partials/actions.html',
      }).
      when('/print', {
        templateUrl: 'partials/print.html',
      }).
      otherwise({
        redirectTo: '/actions'
      });
  }]);


