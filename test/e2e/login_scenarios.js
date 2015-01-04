'use strict';

describe('Login App', function() {

  beforeEach(function () {
	  browser.driver.get('http://localhost:9000/user/testprofile'); //this will add cookie
	  //element(by.id("test")).style.display = "";;
  });
  
  describe('Check Login App', function() {
	  it('Contact no fail', function() {
			browser.get('http://localhost:8000/selfservice/profile/signup');
			
			//make contact number invalid
			var ctcModel = element(by.model('ctcNo'));
			var stateModel = element(by.model('state'));
			var submit = element(by.id('submit'));
			
			//Set the only field needed.
			stateModel.sendKeys('PT');
			
			//Invalid sending
			ctcModel.sendKeys('ABC');
			submit.click();
			
			expect(submit.isEnabled()).toBe(true);			
			
			ctcModel.clear();
			ctcModel.sendKeys('123456789012345');
			submit.click();
			
			expect(submit.isEnabled()).toBe(true);
	  });
	  
	  it('Empty Names up fail', function() {
			browser.get('http://localhost:8000/selfservice/profile/signup');
			
			//make contact number invalid
			var fstName = element(by.model('fstName'));
			var lstName = element(by.model('lstName'));
			var stateModel = element(by.model('state'));
			var submit = element(by.id('submit'));
			
			//Set the only field needed.
			stateModel.sendKeys('PT');
			
			//Invalid sending
			fstName.clear();
			submit.click();
			
			//Invalid sending
			fstName.sendKeys('Hello');
			lstName.clear();
			submit.click();
			
			expect(submit.isEnabled()).toBe(true);
	  });
	
	  
	  //Make sure database is functional
	  it('Signing up success', function() {
		browser.get('http://localhost:8000/selfservice/profile/signup');
		
		//make contact number invalid
		var ctcModel = element(by.model('ctcNo'));
		var stateModel = element(by.model('state'));
		var submit = element(by.id('submit'));
		var modal = element(by.binding('status'));
	
		stateModel.sendKeys('PT');
		submit.click();
		
		var ok = element(by.model('btnOK'));
		ok.click();
		browser.sleep(1000);
		expect(browser.getCurrentUrl()).toContain('localhost');
	  });
  });
});
