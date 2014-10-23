'use strict';

var contactus = "You can contact us via Email: "+
	"<a href=\"mailto:jomjaring@gmail.com\">jomjaring@gmail.com</a>"+
	" or "+ 
	"<a href=\"mailto:mailyoonghan@gmail.com\">mailyoonghan@gmail.com</a>.";

/* Controllers */
var menuApp = angular.module('menuApp', ['ngSanitize','ngAnimate']);
var mainApp = angular.module('mainApp', []);

mainApp.controller('menuListCtrl', ['$scope','$http', '$location',
 function ($scope, $http, $location) {
  $http.get('/cache/json/menulist.json').success(function(data){
	$scope.menus = data;
	
	$scope.mainBtnName = data[0].display;
	$scope.mainBtnSrc  = data[0].link;
  });
  
  $scope.go = function ( path ) {
    location.href = path ;
  };
}]);

menuApp.controller('subMenuListCtrl', ['$scope','$http', '$location', '$filter',
 function ($scope, $http, $location, $filter) {
   $scope.init = function(menuid)
   {
		$http.get('/cache/json/menulist.json').success(function(data){
			var filteredData = [{"tooltip":"Homepage","display":"Home","link":"/"}];
			$.each(data, function(i, item){
			  if(item.display != menuid)
				filteredData.push(item);
			});
			$scope.menus = filteredData;
		});
   }
   
   $scope.registerButton = function(){
     $(function() {
		$('#boxclose').click(function(){
			$('#box').animate({'bottom':'-200px'},500);
		});
	});
   };
   
   $scope.activateBtn = function(){
		$('#box').animate({'bottom':'10px'},200);
   };
   
   $scope.registerButton();
	
   $scope.contactus=contactus;
}]);

menuApp.controller('blogCtrl', ['$scope','$http', '$location', '$filter',
 function ($scope, $http, $location, $filter) {
  var orderBy = $filter('orderBy');
  
  $http.get('/cache/json/blog.json').success(function(data){
	$scope.blogs = data.posts;
	
	$scope.dateCompare = function(dateCompare){
		return Date.parseExact(dateCompare.date, "MMM d, yyyy").getTime();
	};
	
	$scope.order = function(predicate, reverse){
		$scope.blogs = orderBy($scope.blogs, predicate, reverse);
	};
	
	$scope.sortDescDisplay = function(){
		$scope.order($scope.dateCompare, true);
	};
	$scope.sortAscDisplay = function(){
		$scope.order($scope.dateCompare, false);
	};
	  
	$scope.order($scope.dateCompare, true);
  });
}]);

menuApp.controller('technologyCtrl', ['$scope','$http', '$location', 
 function ($scope, $http, $location) {  
  $http.get('/cache/json/technology.json').success(function(data){
	$scope.technologies = data;
  });
}]);