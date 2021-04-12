angular.module('movieApp').controller('AppController', function ($scope, $location) {
    // $scope.appUrl = $location.absUrl();
    $scope.onMainClick = function (id) {
		$location.replace()
		$location.url('/main');
	}
    
});