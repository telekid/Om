angular.module('Om.directives', [])

    .directive('dateDisplay', function () {
        return {
            restrict: 'A',
            template: '<div title="{{date}}">{{age}}</div>',
            scope: {
                timestamp: '='
            },
            link: function (scope, elem, attrs) {
                var date = new Date(scope.timestamp);
                console.log(date);
                scope.date = date.toString();
                scope.age = moment(date).fromNow();
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