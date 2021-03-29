angular.module('movieApp').directive('toggleButton', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/toggle-button.directive.html',
        scope: {
            text1: "@",
            text2: "@",
            ontoggleclick: "&",
        },
        link: function (scope) {
            scope.ontoggle = function (value) {
                
                scope.ontoggleclick({ clickValue: value })
            };
        }
    }
})