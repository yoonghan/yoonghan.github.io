'use strict';

describe('Booking Test', function() {

  beforeEach(function () {
	 browser.driver.get('http://localhost:9000/test/testprofile/6'); //this will add cookie
  });

  describe('Enter Booking Site', function() {
	  it('Make A confirm booking then cancel', function() {
		browser.driver.get('http://localhost:9000/test/prepareBooking/true');
		browser.sleep(2000);
		browser.get('http://localhost:8000/site/selfservice/booking/calendar');

		//Book
		var event = element.all(by.css('.unreserved'));
		event.get(0).click();
		browser.sleep(200);
		runTest();

		browser.sleep(500);

		//Cancel Pending
		var event = element.all(by.css('.pending'));
		event.get(0).click();
		browser.sleep(200);
		runTest();
	  });

	  it('Make A booking then cancel', function() {
		browser.driver.get('http://localhost:9000/test/prepareBooking/false');
		browser.sleep(2000);
		browser.get('http://localhost:8000/site/selfservice/booking/calendar');

		//Book
		var event = element.all(by.css('.unreserved'));
		event.get(0).click();
		browser.sleep(200);
		runTest();

		browser.sleep(500);

		//Cancel Pending
		var event = element.all(by.css('.reserved'));
		event.get(0).click();
		browser.sleep(200);
		runTest();
	  });

	  it('Press the settings button', function() {
		  var PROFILE_PAGE = "/profile/setting";

		  browser.get('http://localhost:8000/site/selfservice/booking/calendar');
		  element.all(by.id('btnSetting')).click();
		  expect(browser.getCurrentUrl()).toContain(PROFILE_PAGE);
	  });

	  function runTest(){
			$$('#btnCancelBook').count().then(
				function(countCancelExist){
					if(countCancelExist == 1){
						element(by.id('btnCancelBook')).click();
						browser.sleep(1000);
						element(by.id('btnOK_Success')).click();
					}else{
						var blogList = element.all(by.repeater('e in currEvents').column('e.userInfo'));
						blogList.then(function(e){
							e[0].getText().then(function(userInfoCode){

								element(by.id('btnBook')).click();

								var ternary = parseInt(userInfoCode,10).toString(3);
								var returnVal = function(pos){ return (ternary.length-pos < 0) ? 0: parseInt(ternary.charAt(ternary.length-pos),10)}
								var input_Email;
								var input_ContactNo;
								var input_Addr;
								var input_State;
								var input_PstCd;
								if( returnVal(2) != 0)
									input_Email = element(by.model('dtl_email'));
								if( returnVal(3) != 0)
									input_ContactNo = element(by.model('dtl_ctcNo'));
								if( returnVal(4) != 0){
									input_Addr = element(by.model('dtl_addr'));
									input_PstCd = element(by.model('dtl_pstCd'));
									input_State = element(by.model('dtl_state'));
								}
								if(typeof input_Email !== 'undefined'){
									input_Email.clear();
									input_Email.sendKeys("protractorTest@email.com");
								}
								if(typeof input_ContactNo !== 'undefined'){
									input_ContactNo.clear();
									input_ContactNo.sendKeys("+000000001");
								}
								if(typeof input_Addr !== 'undefined'){
									input_Addr.clear();
									input_Addr.sendKeys("protractor addr");
									input_PstCd.clear();
									input_PstCd.sendKeys("10000");
								}

								element(by.id('dtl_btnOK')).click();
								browser.sleep(1000);
								element(by.id('btnOK_Success')).click();
							});
						});
					}
				}
			);
	  }
  });
});
