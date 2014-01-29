'use strict';
 
describe('Directive: dateDisplay', function(){
    var scope,
      elem,
      compiled,
      mockTime,
      evalTime;

      var seconds = 1000;
      var minutes = seconds * 60;
      var hours = minutes * 60;
      var days = hours * 24;


     beforeEach(function (){
    //load the module
    module('Om.directives');
    
    //set our view html.
    
    inject(function($compile, $rootScope) {
      scope = $rootScope.$new();



      mockTime = function(time) {
        return '<div date-display timestamp=' + time + '></div>';    
        };
      
      evalTime = function(mockTime) {
          //get the jqLite or jQuery element
          elem = angular.element(mockTime);
          
          //compile the element into a function to 
          // process the view.
          compiled = $compile(elem);
          
          //run the compiled view.
          compiled(scope);
          
          //call digest on the scope!
          scope.$digest();        
          };

    });
  });

    it('should display "moments ago" if timestamp is less than 60 seconds old.', function() {

        var time = mockTime(Date.now() - (0.5 * minutes));

        evalTime(time);

        expect(elem.text()).toBe('just now');

    });

    it('should display "[n] minutes ago" if the timestamp is 90 seconds old.', function() {
        // Subtract the time, don't add it!
        var time = mockTime(Date.now() - 1.5 * minutes);

        evalTime(time);

        expect(elem.text()).toBe('1 minute ago');

        });

    describe('Minutes: 2m <= t <= 60m', function() {

       it('lower boundry', function() {
           var time = mockTime(Date.now() - 2.5 * minutes);

           evalTime(time);

           expect(elem.text()).toBe('2 minutes ago');
       });

       it('upper boundry', function() {
           var time = mockTime(Date.now() - 59.5 * minutes);

           evalTime(time);

           expect(elem.text()).toBe('59 minutes ago');

       });

    });

    describe('Hour: 1h1m <= t <= 1h59m', function() {
      it('lower boundry', function() {
        var time = mockTime(Date.now() - (1 * hours + 1 * minutes));

        evalTime(time);

        expect(elem.text()).toBe('1 hour ago');
      });

      it('upper boundry', function() {
        var time = mockTime(Date.now() - (1 * hours + 59 * minutes));

        evalTime(time);

        expect(elem.text()).toBe('1 hour ago');

      });
    });

    describe('Hours until yesterday: 2h1m <= t <= 2am', function() {

    });

    describe('Day: 2am <= previous 2am', function() {

    });

    describe('Days: 2 days ago <= t <= previous 31st of the month', function() {

    })

});