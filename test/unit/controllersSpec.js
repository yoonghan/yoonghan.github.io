'use strict';

/* jasmine specs for controllers go here */


/**
  * Test that menu list layout is correct.
  **/
  describe('menuListCtrl', function(){
		var scope, ctrl, $httpBackend;
		
		beforeEach(angular.mock.module('mainApp'));
		
		beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_, $location) {
			  $httpBackend = _$httpBackend_;
			  $httpBackend.expectGET('/cache/json/menulist.json').
				  respond([{display: 'All about us', link:'a'}, {display: 'Site Design', link: 'b'}]);

			  scope = $rootScope.$new();
			  
			  //spyOn($location, 'path').andReturn('Fake location')
			  ctrl = $controller('menuListCtrl', {$scope: scope});			  
			  
		}));


		it('should contains first element', function() {
		  $httpBackend.flush();
 			  expect(scope.mainBtnName).toEqual("All about us");
			  expect(scope.mainBtnSrc).toEqual("a");
		});
  });
  
  /**
  * Test that technology/architecture layout is correct.
  **/
  describe('technologyCtrl', function(){
		var scope, ctrl, $httpBackend;
		
		beforeEach(angular.mock.module('menuApp'));
		
		beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_, $location) {
			  $httpBackend = _$httpBackend_;
			  $httpBackend.expectGET('/cache/json/technology.json').
				  respond([{display: 'All about us', link:'a'}, {display: 'Site Design', link: 'b'}]);

			  scope = $rootScope.$new();
			  
			  ctrl = $controller('technologyCtrl', {$scope: scope});			  
			  
		}));


		it('should contains all elements', function() {
		  $httpBackend.flush();
		  expect(scope.technologies).toEqual([{display: 'All about us', link:'a'}, {display: 'Site Design', link: 'b'}]);
		});	
  });
  