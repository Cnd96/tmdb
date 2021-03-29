angular.module('movieApp').directive('peopleVerticalCard', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/people-vertical-card.directive.html',
        scope: {
            name: "@",
            posterpath: "@",
            character: "@"
        }
    }
})
