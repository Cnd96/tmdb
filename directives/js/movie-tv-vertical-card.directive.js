angular.module('movieApp').directive('movieTvVerticalCard', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/movie-tv-vertical-card.directive.html',
        scope: {
            title: "@",
            releasedate: "@",
            posterpath: "@"
        }
    }
})