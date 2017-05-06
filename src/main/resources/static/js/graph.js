(function() {
	var module = angular.module("graphModule",[]);
	
	module.controller("graphCtrl", ["$scope", "$http", movies]);
	
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
	
	function onError(reason){
		$scope.error = "Could not find the year";
	};
	
	function moviesInYear(movies){
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
		
		for (var key in dict) {
			values.push({label: key, value: dict[key]});
		}
		
		return [{key: "Movie Graph", values: values}];
	}

	function plotGraph(response){
		var movies = response.data;
		
		nv.addGraph(function() {
			  var chart = nv.models.discreteBarChart()
			    .x(function(d) { return d.label;})
			    .y(function(d) { return d.value;})
			    .staggerLabels(true)
			    .showValues(true);

			  d3.select('#chart svg')
			    .datum(moviesInYear(movies))
			    .transition().duration(500)
			    .call(chart);

			  nv.utils.windowResize(chart.update);

			  return chart;
			});
	};
	
	$scope.moviesByYear = function(startYear, endYear){
		if (startYear && endYear) {
			$http.get("/movies?startYear=" +startYear+ "&endYear=" +endYear).then(plotGraph, onError);
		} else if ((startYear && !endYear) || (!startYear && endYear)) {
			alert("please selected both years");
		} else {
			$http.get("/movies").then(plotGraph, onError);
		}
	};
}
})();