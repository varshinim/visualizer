(function() {
	var app = angular.module("app",["ngRoute","searchModule","moviesModule","graphModule"]);
	
	app.config(function($routeProvider) {
	    $routeProvider
	    .when("/", {
	    	controller: "homeCtrl",
	        templateUrl : "home"
	    })
	    .when("/search", {
	    	controller: "searchCtrl",
	        templateUrl : "search"
	    })
	    .when("/movies", {
	    	controller: "moviesCtrl",
	        templateUrl : "movies"
	    })
	    .when("/graph", {
	    	controller: "graphCtrl",
	        templateUrl : "graph"
	    });
	});
	
	app.controller("homeCtrl", function ($scope) {
		$scope.message = "This is the contents page";
	});
})();

