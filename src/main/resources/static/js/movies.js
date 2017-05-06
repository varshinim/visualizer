(function() {
	var module = angular.module("moviesModule",[]);
	
	module.controller("moviesCtrl", ["$scope", "$http", movies]);
	
	function movies($scope, $http){
		$scope.getStartYear = getYears;
	    $scope.getEndYear = function() {
		return getYears().filter(function(o){ 
				if ($scope.startYear) {
					return o >= $scope.startYear;
				} else {
					return o;
				}
			});
	};
	
	function getYears(){
		var year = new Date().getFullYear();
		var arr = [];
		for(var i=0;i<10;i++){
			arr[i] = year - i;
		}
		return arr;
	}
	
	var onError = function(reason){
		$scope.error = "Could not find the year";
	};
	
	var moviesList = function(response){
		$scope.movies = response.data;
	};
	
	$scope.moviesByYear = function(startYear,endYear){
		if (startYear && endYear) {
			$http.get("/movies?startYear=" +startYear+ "&endYear=" +endYear).then(moviesList, onError);
		} else if ((startYear && !endYear) || (!startYear && endYear)) {
			alert("please selected both years");
		} else {
			$http.get("/movies").then(selectedYear, onError);
		}
	};
	
	$scope.onMovieClick = function(movie) {
		$scope.showDetails = true;
		$scope.selectedMovie = movie;
	};
}
})();