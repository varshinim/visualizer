var app = angular.module("App",[]);

app.controller("Welcome", ["$scope", "$http", welcome]);

function welcome($scope,$http){
	var list = function(response){
		$scope.movies = response.data;
	};
	
	var onError = function(reason){
		$scope.error = "Could not find";
	};
	
	var selectedMovie = function(response){
		$scope.movieResults = response.data;
	};
	
	// $http.get("/movies").then(selectedYear, onError);

	$scope.search = function(name){
		if (name) {
			$http.get("/movies/"+name).then(selectedMovie, onError);
		} else {
			onError();
		}
		
	};
	
	
	$scope.yearFrom = [2017,2016,2015,2014,2013,2012,2011,2010,2009,2008];
	$scope.yearTo = [2017,2016,2015,2014,2013,2012,2011,2010,2009,2008];
	
	var selectedYear = function(response){
		$scope.selectedYear = response.data;
	};
	
	$scope.search1 = function(year1,year2){
		if (year1 && year2) {
			$http.get("/movies?startYear=" +year1+ "&endYear=" +year2).then(selectedYear, onError);
		} else if ((year1 && !year2) || (!year1 && year2)) {
			alert("please selected both years");
		} else {
			$http.get("/movies").then(selectedYear, onError);
		}
	};
}