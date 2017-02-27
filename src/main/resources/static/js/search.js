(function() {
	var module = angular.module("searchModule",[]);
	
	module.controller("searchCtrl", ["$scope", "$http", search]);
	
	function search($scope, $http){
		var list = function(response){
			$scope.movies = response.data;
		};
		
		var onError = function(reason){
			$scope.error = "Could not find";
		};
		
		var selectedMovie = function(response){
			$scope.movieResults = response.data;
		};
	
		$scope.search = function(name){
			if (name) {
				$http.get("/movies/"+name).then(selectedMovie, onError);
			} else {
				onError();
			}
		};
	}
})();