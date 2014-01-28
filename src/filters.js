angular.module('Om.filters', []).
	filter('ctrlCode', function () {
	    return function(input) {
	        if ((input + 1) <= 9) {
	            return String.fromCharCode(8963) + " " + (input + 1);
	        }
	    }
	});


