angular.module('Om.directives', [])

    .directive('dateDisplay', function () {
        return {
            restrict: 'A',
            template: '<div title="{{date}}">{{formattedTimestamp}}</div>',
            scope: {
                timestamp: '='
            },
            link: function (scope, elem, attrs) {
                var date = new Date(scope.timestamp);
                var currentDate = new Date(Date.now());
                var delta = new Date(currentDate - date);
                
                var seconds = 1000;
                var minutes = seconds * 60;
                var hours = minutes * 60;
                var days = hours * 24;

                if (delta < (1 * minutes)) {
                    // Less than a minute ago
                    scope.formattedTimestamp = "just now";

                } else if ((delta >= (1 * minutes)) && (delta < 1 * hours)) {
                    // Less than an hour ago
                    if (delta.getMinutes() == 1) {
                        scope.formattedTimestamp = "1 minute ago";
                    } else {
                        scope.formattedTimestamp = (delta.getMinutes() + " minutes ago");
                    };
                } else if ((delta >= (1 * hours)) && (delta < (1 * days)) && (date.getDay() == currentDate.getDay())) {
                    // Less than 24 hours ago

                    if (delta.getHours() == 1) {
                        scope.formattedTimestamp = "1 hour ago";
                    }
                    else {
                        scope.formattedTimestamp = (delta.getHours() + " hours ago");
                    };
                };
                
                scope.date = date.toString();
            
                // Just Now
                // [n] minutes ago
                // [n] hours ago
                // Yesterday
                // [Day of week]
                // Date
            

            }
            
        }
    })
    .directive('enterKey', function() {
        return {
            restrict: 'A',
            compile: function(element, attr) {
                return function(scope, element, attr){
                    $('body').on("keypress", function(event) {
                        if (event.which == 13) {                        
                            event.preventDefault();
                            $(element).click();
                            $(document.activeElement).blur();
                        }
                    }
                )};
            }
        };
    });