'use strict';
 
describe('ActionsController', function(){
    var scope;//we'll use this scope in our tests
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('Om'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();

        //declare the controller and inject our empty scope
        $controller('ActionsController', {$scope: scope});
        
    }));

    it('$scope.items should return an empty array', function(){
        expect(scope.items).toEqual([]);
    });
    describe('newItem listener', function(){
        it('should create a new item in $scope.items', function(){
            scope.newItem.make = 'DPA';
            scope.newItem.model = '4061';
            
            spyOn(scope, 'addItem');
            scope.addItem();
            
            expect(scope.addItem).toHaveBeenCalled();
            
            console.log(scope.items);

        });
    });
});