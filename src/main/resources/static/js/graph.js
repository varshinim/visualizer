(function() {
	var module = angular.module("graphModule",[]);
	
	module.controller("graphCtrl", ["$scope", "$http", movies]);
	
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
	
	function moviesInYear(movies){
		// [{title:, id:, releaseYear:}]
		var dict = {};
		var values = [];

		for(var i=0;i<movies.length;i++){
			var a = movies[i].releaseYear;
			if(a in dict){
				dict[a] = dict[a] + 1;
			} else{
				dict[a] = 1;
			}
		}
		
		// dict = {2014: 2, 2015: 3};
		for (var key in dict) {
			values.push({label: key, value: dict[key]});
		}
		
		// [{key: , values: [{key:, value:}]}]
		return [{key: "Movie Graph", values: values}];
	}

	var selectedYear = function(response){
		$scope.selectedYear = response.data;
			
		nv.addGraph(function() {
			  var chart = nv.models.discreteBarChart()
			    .x(function(d) { return d.label;})
			    .y(function(d) { return d.value;})
			    .staggerLabels(true)
			    .showValues(true);

			  d3.select('#chart svg')
			    .datum(moviesInYear($scope.selectedYear))
			    .transition().duration(500)
			    .call(chart);

			  nv.utils.windowResize(chart.update);

			  return chart;
			});
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