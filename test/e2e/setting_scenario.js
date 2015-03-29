'use strict';

describe('Settings App', function() {

  beforeEach(function () {
	  browser.driver.get('http://localhost:9000/user/testprofile'); //this will add cookie
	  //element(by.id("test")).style.display = "";;
  });
  
  describe('Check Settings App', function() {
	  it('Check Subscription filter working', function() {
			browser.get('http://localhost:8000/selfservice/profile/setting');
			
			element(by.id('lnk_subscription')).click();
			
			var cNameModel = element(by.model('cNameSearch'));
			
			cNameModel.sendKeys('Demo');
			var hosts = element.all(by.repeater('e in chkHostList'));
			expect(hosts.count()).toBe(1);
			
			var hostsName = element.all(by.repeater('e in chkHostList').column('e.cName'));
			hostsName.then(function(cname){
				expect(cname[0].getText()).toContain("Demo");
			});

            //Button is clicked.
            var bln_statBtn = false;
            //Click first page
			var currStat = element.all(by.repeater('e in chkHostList').column('e.currStat'));
            currStat.then(function(statBtn){
                console.log(statBtn);
            });
			
			element(by.id('save')).click();
			
			var ok = element(by.model('btnOK'));
			ok.click();

	  });
	  
	  it('Check Reminder filter working', function() {
			browser.get('http://localhost:8000/selfservice/profile/setting');
			
			element(by.id('lnk_reminder')).click();
			
			var chk_email = element(by.model('chk_email'));
			var n_email = element(by.model('n_email'));
			
			//Uncheck the checkbox
			n_email.isDisplayed().then(function (isVisible) {
			    if (isVisible) {
			    	n_email.clear();
			    	chk_email.click();
			    }
			});
			
			chk_email.click();
			
			expect(n_email.isDisplayed()).toBe(true);
			
			expect(element(by.id('emailBlank')).isDisplayed()).toBe(true);
			
			n_email.sendKeys('invalid');
			
			expect(element(by.id('emailBlank')).isDisplayed()).toBe(false);
			expect(element(by.id('emailInvalid')).isDisplayed()).toBe(true);
			
			element(by.id('save')).click();
			
			n_email.sendKeys('@email.com');
			expect(element(by.id('emailInvalid')).isDisplayed()).toBe(false);
			
			element(by.id('save')).click();
			var ok = element(by.model('btnOK'));
			ok.click();
			
	  });
	  
	  it('Check Profile filter working', function() {
			browser.get('http://localhost:8000/selfservice/profile/setting');
			
			element(by.id('lnk_profile')).click();
			
			//This test has been done by profile, do not need to do again.
			
			element(by.id('save')).click();
			var ok = element(by.model('btnOK'));
			ok.click();
			
	  });
	  
	  /**Should work for authorized user**/
	  it('Check Report filter working', function() {
			browser.get('http://localhost:8000/selfservice/profile/setting');
			
			element(by.id('lnk_report')).click();
			
			//This test has been done by profile, do not need to do again.
			var email = element(by.model('email'));
			email.sendKeys('@email.com');
			expect(element(by.id('emailInvalid')).isDisplayed()).toBe(true);
			
			email.clear();
			expect(element(by.id('emailRequired')).isDisplayed()).toBe(true);
			
			email.sendKeys('somemail@email.com');
			element(by.id('save')).click();
			var ok = element(by.model('btnOK'));
			ok.click();
			
	  });
  });
});
