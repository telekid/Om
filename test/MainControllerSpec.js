'use strict';
 
describe('ItemController', function(){
    var scope;//we'll use this scope in our tests
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('MyTutorialApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();

        //declare the controller and inject our empty scope
        $controller('ItemController', {$scope: scope});
    }));

    it('$scope.items should return an empty array', function(){
        expect(scope.items).toEqual([]);
    });
    describe('newItem listener', function(){
        it('should create a new item in $scope.items', function(){
            
            var action = "add";
            var quantity = 15;
            
            scope.$broadcast('newItem', [action, quantity]);
            expect(scope.items).toEqual([[action, quantity]]);
        });    
    });
});