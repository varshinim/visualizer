(function() {
	var module = angular.module("moviesModule",[]);
	
	module.controller("moviesCtrl", ["$scope", "$http", movies]);
	
	function movies($scope, $http){
		
		$scope.getStartYear = getYears;
	    $scope.getEndYear = function() {
		return getYears().filter(function(o){ 
				if ($scope.year1) {
					return o >= $scope.year1
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
	
	var selectedYear = function(response){
		$scope.selectedYear = response.data;
	};
	
	$scope.moviesByYear = function(year1,year2){
		if (year1 && year2) {
			$http.get("/movies?startYear=" +year1+ "&endYear=" +year2).then(selectedYear, onError);
		} else if ((year1 && !year2) || (!year1 && year2)) {
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