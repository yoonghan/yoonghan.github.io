'use strict';

describe('Introduction App', function() {

  var menuCounts = 8;

  it('Check introduction page', function() {
    browser.get('/');
	element(by.id('show')).click();
	
	//check if browser is correct.
    expect(browser.getTitle()).toEqual('JOM Jaring Introductory Page');
	
	//check navigation is possible
	element(by.id('nav')).getLocation().then(function (navLocation) {
		var left = navLocation.x;
		expect(left).toBe(0);
	});
	
	//check that about button is correct.
	expect(element(by.binding('mainBtnName')).getText()).toEqual('About Us');
  });
  
  it('Check about page', function() {
    browser.get('/webby/webpage/about');
	
	//check all the links are displaying correctly
	var menuList = element.all(by.repeater('menu in menus'));
	expect(menuList.count()).toBe(menuCounts);
  });
  
  it('Check architecture page', function() {
    browser.get('/webby/webpage/architecture');
	
	//check all the links are displaying correctly
	var menuList = element.all(by.repeater('menu in menus'));
	expect(menuList.count()).toBe(menuCounts);
	
	//check all the technologies displaying correctly
	var techList = element.all(by.repeater('technology in technologies'));
	expect(techList.count()).toBeGreaterThan(3);
	
	//check query is correctly displayed
	var query = element(by.model('query'));
	query.sendKeys('Node.js');
	var techListColumn = element.all(by.repeater('technology in technologies').column('technology.tech'));
//	function getNames() {
//        return techListColumn.map(function(elm) {
//          return (elm.getText());
//        });
//    }
//	
//	expect(getNames()).toContain("Node.js");
	techListColumn.then(function(tech){
		expect(tech[0].getText()).toContain("Node.js");
	});
  });
  
  it('Check blog page', function() {
    browser.get('/webby/webpage/blog');
	
	//check all the links are displaying correctly
	var menuList = element.all(by.repeater('menu in menus'));
	expect(menuList.count()).toBe(menuCounts);
	
	//check all the technologies displaying correctly
	var blogList = element.all(by.repeater('blog in blogs'));
	expect(blogList.count()).toBeGreaterThan(3);
	
	//check query is correctly displayed
	var query = element(by.model('query'));
	query.sendKeys('Node');
	var blogListColumn = element.all(by.repeater('blog in blogs').column('blog.task'));
//	function getTasks() {
//        return blogListColumn.map(function(elm) {
//          return (elm.getText());
//        });
//    }
//	var extracted = eval(getTasks());
//	expect(extracted).toContain("Node JS");
	blogListColumn.then(function(blog){
		expect(blog[0].getText()).toContain("Node");
	});
  });
  
  it('Check reasearch page', function() {
	    browser.get('/webby/webpage/research');
	    
	  //check all the links are displaying correctly
		var menuList = element.all(by.repeater('menu in menus'));
		expect(menuList.count()).toBe(menuCounts);
  });
});
