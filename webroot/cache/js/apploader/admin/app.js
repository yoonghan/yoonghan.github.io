define(['angularAMD',
'angular-route',
'angular-animate',
'angular-material',
'angular-aria',
'angular-messages',
'ui-bootstrap-custom',
'ui-bootstrap-custom-tpls',
'ng-flow',
'calendar-filter'
], function (angularAMD) {
  var defaultPath="admin/view/"

  var app = angular.module("ngreq-app", ['ngMaterial','ui.bootstrap','ngMessages','ngRoute','flow','calFilters']);
  app.factory("calendar",function(){
    return [];
  })
  .filter('startFrom', function() {
      return function(input, start) {
          start = +start; //parse to int
          if(typeof input === 'undefined')
            return [];
          else{
            return input.slice(start);
          }
      }
  })
  .config(['flowFactoryProvider', function (flowFactoryProvider) {
     flowFactoryProvider.defaults = {
         target: uploadURL,
         withCredentials: true,
         maxChunkRetries: 1,
         chunkRetryInterval: 5000,
         singleFile:true,
         permanentErrors:[500, 501]
     };
  }])
  .config(function ($httpProvider, $routeProvider, $locationProvider, $mdThemingProvider) {
    /**Send Cookie [S]**/
    	$httpProvider.defaults.withCredentials = true;
    	$httpProvider.defaults.useXDomain = true;
    /**Send Cookie [E]**/
    /**Theme [S]**/
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('green')
            .dark();
    	$mdThemingProvider.theme('default')
    		.primaryPalette('blue',{'default':'800'})
    		.accentPalette('green',{'default':'500'});
    /**Theme [E]**/
    $routeProvider
    .when("/home", angularAMD.route({
        templateUrl: defaultPath+'home'
    }))
    .when("/settings", angularAMD.route({
        templateUrl: defaultPath+'settings', controller: 'SettingsCtrl'
    }))
	.when('/events', angularAMD.route({
        templateUrl: defaultPath+'events', controller: 'EventsCtrl'
    }))
    .when('/userlist/:oid', angularAMD.route({
        templateUrl: defaultPath+'events_userlist', controller: 'UserListCtrl'
    }))
    .when('/eventsetup', angularAMD.route({
        templateUrl: defaultPath+'eventsetup', controller: 'EventSetupCtrl'
    }))
    .when('/eventprogress', angularAMD.route({
        templateUrl: defaultPath+'eventsetup_progress', controller: 'EventProgressCtrl'
    }))
    .when('/eventsubmit', angularAMD.route({
        templateUrl: defaultPath+'eventsetup_submit', controller: 'EventSubmitCtrl'
    }))
    .when('/eventempty', angularAMD.route({
        templateUrl: defaultPath+'eventsetup_empty'
    }))
    .otherwise({redirectTo: "/home"});
  });

  app.controller('MenuCtrl', function($rootScope, $scope, $timeout, $mdSidenav) {
	  $rootScope.imageUrl = cpImageURL + "?" + new Date().getTime();
	  
      $scope.menuList=[
		   {pg:"Events",icon:"glyphicon-tasks",lnk:"#/events"},
		   {pg:"Setup",icon:"glyphicon-wrench",lnk:"#/eventsetup"}
	  ];
      
      $rootScope.openWindow = true;
  
	  $scope.close = function() {
		$mdSidenav('left').close();
	  };
	})

  app.controller('AppCtrl', function($rootScope, $scope, $route, $routeParams, $location, $timeout, $mdSidenav, $mdBottomSheet) {
	  var previousPaths=[];
	  $scope.$on('$routeChangeSuccess', function() {
		  previousPaths.push($location.$$path);
		  if(previousPaths.length > 2){
			  previousPaths.splice(0,1);
		  }
	  });

	  $scope.back =function(){
		  var path = previousPaths.length > 1 ? previousPaths.splice(-2)[0] : "/home";
		  $location.url(path == '/settings'?"/home":path);
		  $rootScope.openWindow = true;
	  }

	  $scope.toggleMenu = function() {
		$mdSidenav('left').toggle();
	  };

	  $scope.showBottomMenuSheet = function($event) {
		$mdBottomSheet.show({
		  templateUrl: 'admin/bottom_menu',
		  controller: 'BottomMenuCtrl',
		  targetEvent: $event
		}).then(function(clickedItem) {
		});
	  };
	})

    app.controller('BottomMenuCtrl', function($rootScope, $scope, $location, $mdDialog, $mdBottomSheet) {
      $scope.items = [
        { name: 'Home', icon: 'glyphicon-home', loc:'#/home' },
        { name: 'Settings', icon: 'glyphicon-wrench', loc:'#/settings' },
        { name: 'About', icon: 'glyphicon-user', loc:'about' },
        { name: 'Calendar', icon: 'glyphicon-calendar', loc:homeURL },
        { name: 'LogOff', icon: 'glyphicon-remove-sign red', loc:logoutURL }
      ];
      $scope.listItemClick = function(path) {

        if(path != 'about'){
            $mdBottomSheet.hide("");
            if(path == '#/settings'){
               $rootScope.openWindow = false;
            }else{
               $rootScope.openWindow = true;
            }
            location.href=path;
        }else{
            $mdDialog.show(
              $mdDialog.alert()
                .title('About')
                .content('Administrator - All rights reserved to JOM Jaring 2015')
                .ariaLabel('About')
                .ok('Close')
            );
        }
      };
    })

  return angularAMD.bootstrap(app);
});