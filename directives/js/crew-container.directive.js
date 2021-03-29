angular.module('movieApp').directive('crewContainer', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/crew-container.directive.html',
        scope: {
            crew: "=",
        }
    }
})