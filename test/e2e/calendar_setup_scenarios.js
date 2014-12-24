'use strict';

/**
 * Created to check on the calendar
 */

  var MAX_TITLE_LENGTH=30;
  var MAX_DESC_LENGTH=300;
 
describe('Create Calendar App', function() {

  var SUCCESS_PAGE = "/booking/setup-confirm";
  var RETURN_PAGE = "/booking/calendar";

  beforeEach(function () {
	  browser.driver.get('http://localhost:9000/user/testprofile'); 
  });
  
  describe('Calendar Select', function() {
  
  
	  it('Check calendar display correctly', function() {
			browser.get('http://localhost:8000/selfservice/booking/calendar');
	
			//Can't do much here to test the functionality
	
			var weatherIcon = element(by.id('weatherIcon'));
			var weatherMessage = element(by.id('weatherMessage'));
			
			expect(weatherIcon.isPresent()).toBe(true);		//make sure holder exist
			expect(weatherMessage.isPresent()).toBe(true);	//make sure holder exist
	  });
  });
	  
  describe('Calendar Setup', function() {
	  it('Fail title with invalid value', function() {
			browser.get('http://localhost:8000/selfservice/booking/setup');
	
			var title = element(by.model('title'));
			title.sendKeys('TestEnv %Error');
			
			var desc = element(by.model('desc'));
			desc.sendKeys('Testing environment.');
			
			var fullday = element(by.model('fullday'));
			fullday.click();
			
			var reserveType = element.all(by.model('reserveType'));
			reserveType.get(1).click();
			
			var monday = element.all(by.model('monday'));
			monday.click();
			
			var submit = element(by.model('submit'));
			submit.click();
			
			//Cant submit as it contains invalid characters
			expect(submit.isEnabled()).toBe(true);
			
			title.sendKeys('');	
			//Cant submit as it is empty
			expect(submit.isEnabled()).toBe(true);
			
			var maxTitleChars = Array(MAX_TITLE_LENGTH+2).join('a'); //exceeded with 31 characters.
			title.sendKeys(maxTitleChars);
			//Cant submit as it is empty
			expect(submit.isEnabled()).toBe(true);
	  });
	  it('Fail description that is Empty', function() {
			browser.get('http://localhost:8000/selfservice/booking/setup');
	
			//Can't do much here to test the functionality
	
			var title = element(by.model('title'));
			title.sendKeys('TestEnv Error');
			
			var desc = element(by.model('desc'));
			desc.sendKeys('');
			
			var fullday = element(by.model('fullday'));
			fullday.click();
			
			var reserveType = element.all(by.model('reserveType'));
			reserveType.get(1).click();
			
			var monday = element.all(by.model('monday'));
			monday.click();
			
			var submit = element(by.model('submit'));
			submit.click();
			
			//empty desc
			expect(submit.isEnabled()).toBe(true);
			
			var maxDescChars = Array(MAX_DESC_LENGTH+2).join('a'); //exceeded with 300 characters.
			desc.clear();
			desc.sendKeys(maxDescChars);
			expect(submit.isEnabled()).toBe(true);
	  });
	  it('Fail full day that is not selected and not setup', function() {
			browser.get('http://localhost:8000/selfservice/booking/setup');
	
			//Can't do much here to test the functionality
	
			var title = element(by.model('title'));
			title.sendKeys('TestEnv Error');
			
			var desc = element(by.model('desc'));
			desc.sendKeys('TestEnv Desc');
			
			var reserveType = element.all(by.model('reserveType'));
			reserveType.get(1).click();
			
			var monday = element.all(by.model('monday'));
			monday.click();
			
			var submit = element(by.model('submit'));
			submit.click();
			
			//Check if full day and empty event is selected
			expect(submit.isEnabled()).toBe(true);
			
			var fullday = element(by.model('fullday'));
			fullday.click();
			var abookings = element(by.model('abookings'));
			abookings.clear();
			abookings.sendKeys('100');
			//Check maximum booking number
			expect(submit.isEnabled()).toBe(true);
			abookings.clear();
			abookings.sendKeys('0');
			//Check minimum booking number
			expect(submit.isEnabled()).toBe(true);
	  });
	  it('Check date event', function() {
			browser.get('http://localhost:8000/selfservice/booking/setup');
	
			//Can't do much here to test the functionality
	
			var title = element(by.model('title'));
			title.sendKeys('TestEnv Error');
			
			var desc = element(by.model('desc'));
			desc.sendKeys('TestEnv Desc');
			
			var addEventTime = element(by.model('btnAddTime'));
			addEventTime.click();
			
			var ebooking = element.all(by.id('e.abookings'));
			ebooking.clear();
			ebooking.sendKeys('100');
			
			var reserveType = element.all(by.model('reserveType'));
			reserveType.get(1).click();
			
			var monday = element.all(by.model('monday'));
			monday.click();
			
			var submit = element(by.model('submit'));
			submit.click();
			
			//ebooking is 100
			expect(submit.isEnabled()).toBe(true);
			ebooking.clear();
			//ebooking is 0
			expect(submit.isEnabled()).toBe(true);
	  });
	  it('Fail without event date created', function() {
			browser.get('http://localhost:8000/selfservice/booking/setup');
	
			//Can't do much here to test the functionality
	
			var title = element(by.model('title'));
			title.sendKeys('TestEnv Error');
			
			var desc = element(by.model('desc'));
			desc.sendKeys('TestEnv Desc');
			
			var fullday = element(by.model('fullday'));
			fullday.click();
			
			var submit = element(by.model('submit'));
			submit.click();
			
			expect(submit.isEnabled()).toBe(true);
	  });
	  it('Setup a successful calendar', function() {
			browser.get('http://localhost:8000/selfservice/booking/setup');
	
			//Can't do much here to test the functionality
	
			var title = element(by.model('title'));
			title.sendKeys('TestEnv Error');
			
			var desc = element(by.model('desc'));
			desc.sendKeys('TestEnv Desc');
			
			var fullday = element(by.model('fullday'));
			fullday.click();
			
			var reserveType = element.all(by.model('reserveType'));
			reserveType.get(1).click();
			
			var monday = element.all(by.model('monday'));
			monday.click();
			
			var submit = element(by.model('submit'));
			submit.click();
			
			browser.sleep(3000);
			expect(browser.getCurrentUrl()).toContain(SUCCESS_PAGE);
	  });
	  it('Setup a successful calendar again', function() {
			browser.get('http://localhost:8000/selfservice/booking/setup');
	
			//Can't do much here to test the functionality
	
			var title = element(by.model('title'));
			title.sendKeys('TestEnv Error');
			
			var desc = element(by.model('desc'));
			desc.sendKeys('TestEnv Desc');
			
			//no full day click
			var btnAddTime = element(by.model('btnAddTime'));
			btnAddTime.click();
			
			var reserveType = element.all(by.model('reserveType'));
			reserveType.get(1).click();
			
			var monday = element.all(by.model('monday'));
			monday.click();
			
			var submit = element(by.model('submit'));
			submit.click();
			
			browser.sleep(3000);
			expect(browser.getCurrentUrl()).toContain(SUCCESS_PAGE);
	  });
	  it('Check reset button', function() {
			browser.get('http://localhost:8000/selfservice/booking/setup');
	
			//Can't do much here to test the functionality
	
			var title = element(by.model('title'));
			title.sendKeys('TestEnv Error');
			
			var reset = element(by.model('reset'));
			reset.click();
			
			var ok = element(by.model('btnOK'));
			ok.click();
			
			expect(title.getText()).toBe("");
	  });
	  it('Check home button', function() {
			browser.get('http://localhost:8000/selfservice/booking/setup');
	
			//Can't do much here to test the functionality
	
			var homeKey = element(by.model('returnFlag'));
			homeKey.click();
			
			browser.sleep(1000);
			expect(browser.getCurrentUrl()).toContain(RETURN_PAGE);
	  });
  });
});

/**
Here since it is already in database, test it immediately.
**/
describe('Confirm Calendar', function() {
  beforeEach(function () {
	  browser.driver.get('http://localhost:9000/user/testprofile'); 
  });
  
  describe('Calendar Setup Confirmation', function() {
  
		it('Check Calendar Displaying Correctly', function() {
			browser.get('http://localhost:8000/selfservice/booking/setup-confirm');
	
			browser.sleep(6000);
			
			var submit = element(by.model('submit'));
			var btnCollapse = element(by.model('btnCollapse'));
			btnCollapse.click();
			
			var title = (element.all(by.model('e.title'))).get(0);	//will get many if running script followed above.
			var desc = (element.all(by.model('e.desc'))).get(0); 	//will get many if running script followed above.			
			var maxDescChars = Array(MAX_DESC_LENGTH+2).join('a'); //exceeded with 300 characters.
			var maxTitleChars = Array(MAX_TITLE_LENGTH+2).join('a'); //exceeded with 30 characters.
			title.clear();
			title.sendKeys('TestEnv %Error');
			submit.click();
			var ok = element(by.model('btnOK'));
			ok.click();
			expect(submit.isEnabled()).toBe(true);
			
			title.sendKeys(maxTitleChars);
			submit.click();
			//check 31 characters enable
			var ok = element(by.model('btnOK'));
			ok.click();
			expect(submit.isEnabled()).toBe(true);
			
			title.clear();
			title.sendKeys('abcd');
			desc.clear();
			submit.click();
			ok.click();
			expect(submit.isEnabled()).toBe(true);
	  });
  
	  it('Check Calendar Clears Correctly', function() {
			browser.get('http://localhost:8000/selfservice/booking/setup-confirm');
	
			browser.sleep(6000);
			
			var reset = element(by.model('reset'));
			var reject = element(by.model('reject'));
			
			reset.click();	//make sure reset worked
			
			var ok = element(by.model('btnOK'));
			ok.click();
			
			
			reject.click();	//make sure reset worked
			
			ok.click();
			ok.click();
			
			browser.sleep(1000);
			expect(browser.getCurrentUrl()).toContain('/booking/calendar');
	  });
  });
});