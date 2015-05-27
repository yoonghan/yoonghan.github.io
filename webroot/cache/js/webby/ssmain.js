'use strict';
(function(global){
	var $body = document.getElementsByTagName('body')[0];
	var $html = document.getElementsByTagName('html')[0];
	var $section = document.getElementsByClassName('section');
	var $layer1 = document.getElementById('layer1');
	var $nav = document.getElementById('nav');
	var $marker = document.getElementById('marker');
	var $blog = document.getElementById('blog');
	var $reactive = document.getElementById('reactive');
		
	function r(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	$.Velocity.defaults.easing = "easeInOutsine";
	
	var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent),
		isIE = document.documentMode;
	
	var dotsCount,
		dotsHtml = [],
		$dots;
	
	if (window.location.hash) {
		dotsCount = window.location.hash.slice(1);
	} else {
		dotsCount = isMobile ? (isAndroid ? 40 : 60) : (isChrome ? 200 : 125);
	}
	
	for (var i = 0; i < dotsCount; i++) {
		//"<div class='"+ballClass+"'></div>";
		var div = document.createElement("div");
		div.setAttribute("class", "ball");
		dotsHtml.push(div);
	}
	$dots =dotsHtml;
	
	var $container = document.getElementById('container');
	
	var screenWidth = window.screen.availWidth,
		screenHeight = window.screen.availHeight,
		chromeHeight = screenHeight - (document.documentElement.clientHeight || screenHeight);
	
	var translateZMin = -725,
		translateZMax = 600;
	
	$container
		.style.perspectiveOrigin = (screenWidth/2 + "px " + ((screenHeight * 0.45) - chromeHeight) + "px");
	$container
		.style.perspective = "100px";
	
	if (isWebkit) {
		[].forEach.call($dots, function(el) {
        	el.style.boxShadow = "0px 0px 4px 0px #4bc2f1";
        });
	}
	
	var loading = [
	    { elements: $body, properties: { width: '50%' } },
	    { elements: $body, properties: { width: '100%' } },
	    { elements: $body, properties: { height: '100%' }, options: { 
	      complete: function () {
	        $html.style.background = '#000';
	        $body.style.minWidth =  '480px';
	        [].forEach.call($section, function(el) {
	        	el.style.display = "block";
	        });
	        [].forEach.call($dots, function(el) {
	        	$container.appendChild(el);
	        });
	        $layer1.style.display = 'block';
	     	triggerScrollMagic();
	      }
	    }},
	    { elements: $dots, properties: { 
				translateX: [ 
					function() { return "+=" + r(-screenWidth/2.5, screenWidth/2.5) },
					function() { return r(0, screenWidth) }
				],
				translateY: [
					function() { return "+=" + r(-screenHeight/2.75, screenHeight/2.75) },
					function() { return r(0, screenHeight) }
				],
				translateZ: [
					function() { return "+=" + r(translateZMin, translateZMax) },
					function() { return r(translateZMin, translateZMax) }
				],
				opacity: [ 
					function() { return Math.random() },
					function() { return Math.random() + 0.1 }
				]
			}, options: { duration: 6000, loop:true, delay: 200 } }
	];
	
	$.Velocity.RunSequence(loading);
	
	var controller = new ScrollMagic.Controller();
	
	function triggerScrollMagic(){
		
		prepareNav();
		
		$.Velocity($reactive, { opacity: 0.4 }, {duration: 500, loop:true});
		
		new ScrollMagic.Scene({triggerElement: "#trigger", offset: 1})
			.on("enter", function(){
				$.Velocity($layer1, { opacity: 1 },{visibility:"visible"});
				$.Velocity($nav, {height: "80px"});
			})
			.on("leave", function(){
				$.Velocity($layer1, { opacity: 0 },{visibility:"hidden"});
				$.Velocity($nav, {height: "0"});
			})
			.addTo(controller);
		new ScrollMagic.Scene({triggerElement: "#trigger_marker"})
			.on("enter", function(){
				$.Velocity($marker, "transition.flipBounceYIn");
			})
			.addTo(controller);
		new ScrollMagic.Scene({triggerElement: "#trigger_blog"})
			.on("enter", function(){
				$.Velocity($blog, "callout.shake");
			})
			.addTo(controller);
	}
	
	   
	function prepareNav() {
	  $('a[href*=#]').each(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
	    && location.hostname == this.hostname
	    && this.hash.replace(/#/,'') ) {
	      var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
	      var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
	       if ($target) {
	         var targetOffset = $target.offset().top-100;
	         $(this).click(function() {
	            $("#nav li a").removeClass("active");
	            $(this).addClass('active');
	           $('html, body').animate({scrollTop: targetOffset}, 1000);
	           return false;
	         });
	      }
	    }
	  });
	}
	
}(this));