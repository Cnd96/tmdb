angular.module('movieApp').controller('SearchController',["$scope","$route","$location","appDataService","$window" ,  function ($scope, $route, $location, appDataService,$window) {
	$window.scrollTo(0, 0);
	const QUERY = $route.current.params.query;
	// $scope.searchResults = []
	$scope.searchMovies = []
	$scope.searchTvShows = []
	$scope.searchPeople = []
	$scope.currentData = []

	$scope.mediaTypes = {
		movie: "movie",
		tvShow: "tv",
		person: "person"
	}
	$scope.currentActive = $scope.mediaTypes.movie

	appDataService.getMultiSearchResult(QUERY).then(function (data) {
		$scope.searchMovies = data.movies
		$scope.searchTvShows = data.tvShows
		$scope.searchPeople =data.people

		// // Creating release date string for movies
		$scope.searchMovies.forEach(m => m.realseDateString = appDataService.getDateMonthString(m.realeseDate));
		$scope.currentData = $scope.searchMovies
	}, function (error) {
		console.error(error)
	});

	$scope.onItemClick = function (type) {
		if (type === $scope.mediaTypes.movie) {
			$scope.currentData = $scope.searchMovies
			$scope.currentActive = $scope.mediaTypes.movie
		}
		else if (type === $scope.mediaTypes.tvShow) {
			$scope.currentData = $scope.searchTvShows
			$scope.currentActive = $scope.mediaTypes.tvShow
		}
		else {
			$scope.currentData = $scope.searchPeople
			$scope.currentActive = $scope.mediaTypes.person
		}
	}

	$scope.onMovieCardClick = function (id) {
		// $location.replace()
		// $location.url(`/${$scope.currentActive}/${id}`);
		$location.path(`/${$scope.currentActive}/${id}`)
	}
}]);
