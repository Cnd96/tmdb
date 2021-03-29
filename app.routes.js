angular.module('movieApp').config(function($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'pages/main/main-page.html',
        controller: 'MainController'
    })
    $routeProvider.when('/movie/:movieId', {
        templateUrl: 'pages/movie//movie-page.html',
        controller: 'MovieController'
    })


    $routeProvider.when('/tv/:tvShowId', {
        templateUrl: 'pages/tv/tv-page.html',
        controller: 'TvController'
    })

    $routeProvider.when('/search', {
        templateUrl: 'pages/search/search-page.html',
        controller: 'SearchController',

    })

    $routeProvider.when('/person/:personId', {
        templateUrl: 'pages/person/person-page.html',
        controller: 'PersonController',

    })
    $routeProvider.when('/keyword/:keywordId/:keyWord', {
        templateUrl: 'pages/keyword/keyword-page.html',
        controller: 'KeywordController',

    })

    $routeProvider.otherwise({ redirectTo: '/main' })

});