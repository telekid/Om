'use strict';
 
describe('BidItemController', function(){
    var scope;//we'll use this scope in our tests
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('MyTutorialApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();

        //declare the controller and inject our empty scope
        $controller('BidItemController', {$scope: scope});
    }));

    it('$scope.bidItems should return an empty array', function(){
        expect(scope.bidItems).toEqual([]);
    });
    describe('newItem listener', function(){
        it('should create a new item in $scope.bidItems', function(){
            
            
            
        });
    });
});