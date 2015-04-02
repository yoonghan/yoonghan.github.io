'use strict';

/**
 * Created to check on the calendar
 */

  var MAX_TITLE_LENGTH=31;
  var MAX_DESC_LENGTH=301;
 
describe('Create Calendar App', function() {

  var SUCCESS_PAGE = "/booking/setup-confirm";
  var RETURN_PAGE = "/booking/calendar";

  var pos_btn_EVENT = 0;
  var pos_btn_SETUP = 1;

  beforeEach(function () {
	  browser.driver.get('http://localhost:9000/test/testprofile');
  });

  describe('Admin Page', function() {
    it('Check Events', function() {
    	browser.get('http://localhost:8000/selfservice/admin');
    	var menuBtn = element.all(by.id('btn_menu')).get(pos_btn_EVENT);
        menuBtn.click()

        var title = element(by.model('search.title'));
        title.clear();
        title.sendKeys('Demo');

        var desc = element(by.model('search.desc'));
        desc.clear();
        desc.sendKeys('Demo');

        element(by.cssContainingText('option', 'Requires Confirmation')).click();
        element(by.cssContainingText('option', 'No Confirmation Required')).click();

        element(by.cssContainingText('option', '100')).click();
        element(by.cssContainingText('option', '500')).click();
        element(by.cssContainingText('option', '1000')).click();
    });

    it('Check Setup', function() {
	    browser.get('http://localhost:8000/selfservice/admin');

        var menuBtn = element.all(by.id('btn_menu')).get(pos_btn_SETUP);
        menuBtn.click()

        //test title.
        var title = element(by.model('title'));
        title.sendKeys('TestEnv %Error');

        //test desc
        var desc = element(by.model('desc'));
        desc.sendKeys('Testing environment.');

        //test options
        element(by.model('add_ctcNo')).click();
        element(by.model('opt_ctcNo')).click();
        element(by.model('add_email')).click();
        element(by.model('opt_email')).click();
        element(by.model('add_addr')).click();
        element(by.model('opt_addr')).click();

        //test confirmation
        element(by.model('conf')).click();

        //check full day can be pressed.
        var fullday = element(by.model('fullday'));
        var btnAddTime = element(by.model('btnAddTime'));
        btnAddTime.click().then(
            function action(){
                var stime_hr = element.all(by.model('hours')).get(0);
                var stime_min = element.all(by.model('minutes')).get(0);
                var etime_hr = element.all(by.model('hours')).get(1);
                var etime_min = element.all(by.model('minutes')).get(1);
                var abookings = element.all(by.model('e.abookings')).get(0);

                stime_hr.clear();
                stime_hr.sendKeys('01');
                stime_min.clear();
                stime_min.sendKeys('01');

                etime_hr.clear();
                etime_hr.sendKeys('01');
                etime_min.clear();
                etime_min.sendKeys('01');

                abookings.clear();
                abookings.sendKeys('99');

                var close = element.all(by.id('btn_closeTime')).get(0);
                close.click();
            }
        )
        fullday.click().then(
            function action(){
                var abookings = element(by.model('abookings'));
                abookings.clear();
                abookings.sendKeys('99');
            }
        )

        //Get button
        var reserveType1 = element(by.id('reserveType1'));
//            reserveType1.click().then(
//                function action(){
//                    var day18 = element(by.id('datepicker-46-2542-20'));//always select 18th
//                    day18.click();
//                    element(by.id('btn_reserveType1')).click();
//                    element.all(by.id('btn_reservedIcon')).get(0).click();
//                }
//            );

        var reserveType2 = element(by.id('reserveType2'));
        reserveType2.click().then(
            function action(){
                element(by.model('monday')).click();
                element(by.model('tuesday')).click();
                element(by.model('wednesday')).click();
                element(by.model('thursday')).click();
                element(by.model('friday')).click();
                element(by.model('saturday')).click();
                element(by.model('sunday')).click();
            }
        )
	});

    it('Check Setting - Settings', function() {
        browser.get('http://localhost:8000/selfservice/admin');

        element(by.id('mnu_settings')).click();
        element.all(by.id('btnSettings')).get(0).click();
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain("#/home");

        element(by.id('mnu_settings')).click();
        element.all(by.id('btnSettings')).get(1).click();
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain("#/settings");

        element(by.id('mnu_settings')).click();
        element.all(by.id('btnSettings')).get(3).click();
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain("/calendar");
    });

    it('Check Setting - Logout', function() {
        browser.get('http://localhost:8000/selfservice/admin');

        element(by.id('mnu_settings')).click();
        element.all(by.id('btnSettings')).get(4).click();
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain("/logout");
    });
  });
});