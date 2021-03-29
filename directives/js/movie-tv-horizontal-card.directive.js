angular.module('movieApp').directive('movieTvHorizontalCard', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/movie-tv-horizontal-card.html',
        scope: {
            title: "@",
            releasedate: "@",
            posterpath: "@",
            overview: "@"
        }
    }
})
