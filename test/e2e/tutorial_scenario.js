'use strict';

describe('Tutorial Scan', function() {

  beforeEach(function () {
	  browser.driver.get('http://localhost:9000/user/testprofile'); //this will add cookie
  });
  
  describe('Check main page', function() {
	  it('Flow step 1 till end', function() {
		  
		  //**Page one testing[S]**//
			browser.get('http://localhost:8000/selfservice/booking/calendar#/?tut=1');
			
			expect(element(by.id('tutBtnPrv')).isDisplayed()).toBe(false);
			
			//***Make sure nxt, previous works[S]**/
			element(by.id('tutBtnNxt')).click();
			element(by.id('tutBtnPrv')).click();
			//***Make sure nxt, previous works[E]**/
			element(by.id('tutBtnNxt')).click();
			
			expect(element(by.id('tutBtnNxt')).isDisplayed()).toBe(false);
			
			expect(element(by.id('btnSetting')).getAttribute('class')).toContain('tutorialblink');
			element(by.id('btnSetting')).click();
			//**Page one testing[E]**//
			
			browser.sleep(1000);
			//**Page two testing[S]**//
			expect(browser.getCurrentUrl()).toContain('/profile/setting#/notify/subscription');
			expect(element(by.id('tutBtnPrv')).isDisplayed()).toBe(false);
			
			//***Make sure nxt, previous works[S]**/
			element(by.id('tutBtnNxt')).click();
			element(by.id('tutBtnPrv')).click();
			//***Make sure nxt, previous works[E]**/
			
			element(by.id('tutBtnNxt')).click();
			expect(element(by.id('cancel')).isEnabled()).toBe(false);

			element(by.id('tutBtnNxt')).click();
			expect(element(by.id('save')).getAttribute('class')).toContain('tutorialblink');
			element(by.id('tutBtnPrv')).click();
			expect(element(by.id('save')).getAttribute('class')).not.toContain('tutorialblink');
			element(by.id('tutBtnNxt')).click();
			
			element(by.id('tutBtnNxt')).click();
			expect(element(by.id('cancel')).getAttribute('class')).toContain('tutorialblink');
			element(by.id('tutBtnPrv')).click();
			expect(element(by.id('save')).getAttribute('class')).toContain('tutorialblink');
			element(by.id('tutBtnNxt')).click();
			
			element(by.id('tutBtnNxt')).click();
			expect(element(by.id('save')).getAttribute('class')).not.toContain('tutorialblink');
			expect(element(by.id('cancel')).getAttribute('class')).not.toContain('tutorialblink');
			expect(element(by.model('r_day')).isDisplayed()).toBe(true);
			
			element(by.id('tutBtnNxt')).click();
			expect(element(by.model('fstName')).isDisplayed()).toBe(true);
			
			element(by.id('tutBtnNxt')).click();
			
			element(by.id('tutBtnNxt')).click();
			var cNameModel = element(by.model('cNameSearch'));
			expect(cNameModel.getAttribute('class')).toContain('tutorialblink');
			element(by.id('tutBtnNxt')).click();
			expect(cNameModel.getText()).toEqual("");
			
			element(by.id('tutBtnNxt')).click();
			
			element(by.id('tutBtnNxt')).click();
			expect(element(by.id('tutSpecialRec')).isDisplayed()).toBe(true);
			
			element(by.id('tutBtnNxt')).click();
			expect(element(by.id('tutBtnNxt')).isDisplayed()).toBe(false);
			element(by.css('.btnTutNextScreen')).click();
			
			browser.sleep(1000);
			//**Page two testing[E]**//
			
			
			//**Page three testing[S]**//
			expect(browser.getCurrentUrl()).toContain('/booking/calendar#/?tut=2');
			expect(element(by.id('tutBtnPrv')).isDisplayed()).toBe(false);
			
			//***Make sure nxt, previous works[S]**/
			element(by.id('tutBtnNxt')).click();
			element(by.id('tutBtnPrv')).click();
			//***Make sure nxt, previous works[E]**/
			
			element(by.id('tutBtnNxt')).click();
			
			element(by.id('tutBtnNxt')).click();
			element(by.css('.tutorialblink')).click();
			
			element(by.id('tutBtnNxt')).click();
			expect(element(by.id('btnBook')).isDisplayed()).toBe(true);
			
			element(by.id('tutBtnNxt')).click();
			element(by.id('btnBook')).click();
			element(by.id('btnOK_Success')).click();
			browser.sleep(100);
			
			element(by.id('tutBtnNxt')).click();
			element(by.css('.fc-event')).click();
			expect(element(by.id('btnCancelBook')).isDisplayed()).toBe(true);
			
			element(by.id('tutBtnNxt')).click();
			element(by.id('btnCancelBook')).click();
			element(by.id('btnOK_Success')).click();
			browser.sleep(100);
			
			element(by.id('tutBtnNxt')).click();
			
			element(by.id('tutBtnNxt')).click();
			
			element(by.id('tutBtnNxt')).click();
			
			element(by.id('tutBtnNxt')).click();
			expect(element(by.id('weatherIcon')).isDisplayed()).toBe(true);
			
			element(by.id('tutBtnNxt')).click();
			expect(element(by.id('tutBtnNxt')).isDisplayed()).toBe(false);
			element(by.css('.btnTutNextScreen')).click();
			//**Page three testing[E]**//
	  });
	  
	  
  });
});