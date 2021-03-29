angular.module('movieApp').directive('tvSeasonsHorizontalCard', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/tv-seasons-horizontal-card.html',
        scope: {
            seasonno: "@",
            year: "@",
            episodes: "@",
            overview: "@",
            posterpath:'@'
        }
    }
})
