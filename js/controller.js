'use strict';

var app = angular.module('phoneCat', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	// $locationProvider.html5Mode({
	// 	enabled: true,
	// 	requireBase: false
	// });

	$routeProvider
		.when('/', {
			templateUrl: 'home.html',
			controller: 'homeCtrl'
		})
		.when('/phone/:phoneId', {
			templateUrl: 'phone.html',
			controller: 'phoneCtrl'
		})
		.otherwise({
         	redirectTo: '/'
        });
});

app.controller('homeCtrl', function($scope, $http){
	$http.get('phones/phones.json').success(function(data){
		$scope.phones = data;
	});

	$scope.sort = "age";

});





app.controller('phoneCtrl', function($scope, $routeParams, $http, $location){
	$scope.phoneId = $routeParams.phoneId;

	$scope.linkToData = 'phones/' + $scope.phoneId + '.json';

	$http.get($scope.linkToData).success(function(data){
		$scope.phone = data;
		$scope.imageUrl = data.images[0];
	});

	$scope.setImage = function (newUrl) {
		$scope.imageUrl = newUrl;
	}

});