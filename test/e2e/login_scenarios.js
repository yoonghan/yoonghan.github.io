'use strict';

describe('Login App', function() {

  beforeEach(function () {
	  browser.driver.get('http://localhost:9000/test/testprofile/2'); //this will add cookie
	  //element(by.id("test")).style.display = "";;
  });

  describe('Check Login App', function() {
	  it('Contact no fail', function() {
			browser.get('http://localhost:8000/site/selfservice/profile/signup');

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
			browser.get('http://localhost:8000/site/selfservice/profile/signup');

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

	  it('Postal Code to fail', function() {
			browser.get('http://localhost:8000/site/selfservice/profile/signup');

			//make contact number invalid
			var fstName = element(by.model('fstName'));
			var lstName = element(by.model('lstName'));
			var stateModel = element(by.model('state'));
			var pstCdModel = element(by.model('pstCd'));
			var submit = element(by.id('submit'));

			//Set the only field needed.
			stateModel.sendKeys('PT');

			//Invalid sending
			pstCdModel.sendKeys('ABC');
			submit.click();

			expect(submit.isEnabled()).toBe(true);

			pstCdModel.clear();
			//Invalid sending
			pstCdModel.sendKeys('123456');
			submit.click();

			expect(submit.isEnabled()).toBe(true);

			pstCdModel.clear();
			//Invalid sending
			pstCdModel.sendKeys('9999');
			submit.click();

			expect(submit.isEnabled()).toBe(true);
	  });

	  it('Email to fail', function() {
			browser.get('http://localhost:8000/site/selfservice/profile/signup');

			//make contact number invalid
			var fstName = element(by.model('fstName'));
			var lstName = element(by.model('lstName'));
			var stateModel = element(by.model('state'));
			var emailModel = element(by.model('email'));
			var submit = element(by.id('submit'));

			//Set the only field needed.
			stateModel.sendKeys('PT');

			//Invalid sending
			emailModel.sendKeys('ABC');
			submit.click();

			expect(submit.isEnabled()).toBe(true);

			emailModel.clear();
			//Invalid sending
			emailModel.sendKeys('123456@email');
			submit.click();

			expect(submit.isEnabled()).toBe(true);
	  });


	  //Make sure database is functional
	  it('Signing up success', function() {
		browser.get('http://localhost:8000/site/selfservice/profile/signup');

		//make contact number invalid
		var stateModel = element(by.model('state'));
		var ctcModel = element(by.model('ctcNo'));
		var pstCdModel = element(by.model('pstCd'));
		var emailModel = element(by.model('email'));
		var addrModel = element(by.model('addr'));

		var submit = element(by.id('submit'));

		var modal = element(by.binding('status'));

		stateModel.sendKeys('PT');
		ctcModel.sendKeys('+0123456789');
		pstCdModel.sendKeys('47100');
		emailModel.sendKeys('example@email.com');
		addrModel.sendKeys('house number, 1/14 street name, city code');
		submit.click();

		var ok = element(by.model('btnOK'));
		ok.click();
		browser.sleep(1000);
		expect(browser.getCurrentUrl()).toContain('localhost');
	  });
  });
});
