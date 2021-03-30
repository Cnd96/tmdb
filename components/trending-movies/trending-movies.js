const TODAY = "Today"
const THISWEEK = "Week"

angular.module('movieApp').component('trendingMovies', {
    templateUrl: 'components/trending-movies/trending-movies.html',
    controller: function ($scope, appDataService,$location) {
        const getTrendingMoviesThisWeek=function(){
            appDataService.getTrendingMoviesThisWeek().then(function (data) {
                $scope.trendingData = data
                $scope.$apply()
            }, function (error) {
                console.log(error)
            });
        }

        const getTrendingMoviesToday=function(){
            appDataService.getTrendingMoviesToday().then(function (data) {
                $scope.trendingData = data
                $scope.$apply()
            }, function (error) {
                console.log(error)
            });
        }

        $scope.trendingText1 = TODAY
        $scope.trendingText2 = THISWEEK
        $scope.trendingCurrentItem = TODAY
        $scope.trendingMovies = [];
        $scope.trendingTvShows = [];
        $scope.trendingData = [];
       
        getTrendingMoviesToday();

        $scope.onToggleTrendingChange = function (clickValue) {
            if (clickValue === TODAY) {
                getTrendingMoviesToday();
                $scope.trendingCurrentItem = TODAY;
            }
            else {
                getTrendingMoviesThisWeek();
                $scope.trendingCurrentItem = THISWEEK;
            }
        }

        $scope.onTrendingItemClick = function (id) {
            $location.replace()
            $location.url(`/movie/${id}`);

        }
    }
});
