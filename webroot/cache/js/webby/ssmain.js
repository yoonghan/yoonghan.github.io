'use strict';
(function(global){
	var $body = document.getElementsByTagName('body')[0];
	var $html = document.getElementsByTagName('html')[0];
	var $section = document.getElementsByClassName('section');
	var $title = document.getElementsByClassName('title')[0];
	var $triangles = document.getElementsByClassName('triangle');
	var $layer1 = document.getElementById('layer1');
	var $nav = document.getElementById('nav');
	var $fab = document.getElementById('fab');
	var $marker = document.getElementById('marker');
	var $triggerImg = document.getElementsByClassName('triggerImg');
	var $blog = document.getElementById('blog');
	var $reactive = document.getElementById('reactive');
	var $allLinks = $(".floater > div");
	var $floater = document.getElementsByClassName('floater')[0];
	var $texts = $(".texts");
		
	function r(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	$.Velocity.defaults.easing = "easeOutsine";
	
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
		dotsCount = isMobile ? (isAndroid ? 20 : 30) : (isChrome ? 100 : 60);
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
	    { elements: $body, properties: { width: '100%' }, options: { 
		      complete: function () {
			        $html.style.background = '#000';

			        [].forEach.call($section, function(el) {
			        	el.style.display = "block";
			        });

			        $layer1.style.display = 'block';
			      }
			    }},
	    { elements: $body, properties: { height: '100%' }, options: { 
	      complete: function () {
	    	$html.style.background = '#1976D2';
	    	$.Velocity($fab, "transition.fadeIn");
	    	triggerTriangles();
	        triggerScrollMagic();
	        callBubbles();
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
		
		animateTitle();
		animateReactive();
		animateLinks();
		
		new ScrollMagic.Scene({triggerElement: "#trigger", offset: 1})
			.on("enter", function(){
				$layer1.style.top = 0;
				var mySequence = [
				                  { e: $fab, p: {top:0, left:0, height:"100%", width:"100%", "border-radius":0} },
				                  { e: $layer1, p: { opacity: 1}, o: { duration: 200 } },
				                  { e: $nav, p: {height: "80px"}, o: { duration: 200 } },
				                  { e: $texts, p: "transition.fadeIn" }
				              ];
				$.Velocity.RunSequence(mySequence);
			})
			.on("leave", function(){
				$layer1.style.top = "100vh";
				var mySequence = [
				                  { e: $texts, p: "transition.fadeOut", o: { duration: 100 } },
				                  { e: $nav, p: {height: "0"}, o: { duration: 200 } },
				                  { e: $layer1, p: { opacity: 0}, o: { duration: 200 } },
				                  { e: $fab, p: {top:"90vh", left:"90vw", height:"54px", width:"54px", "border-radius":"50px"}},
				              ];
				$.Velocity.RunSequence(mySequence);
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
		new ScrollMagic.Scene({triggerElement: "#trigger_images"})
			.on("enter", function(){
				var pos = 0;
				[].forEach.call($triggerImg, function(el) {
					var position = pos+"px";
					$.Velocity(el, {top: position, left: position});
					pos += 20;
		        });
			})
			.addTo(controller);
	}
	
	function callBubbles(){
		setTimeout(function() {
	        [].forEach.call($dots, function(el) {
	        	$container.appendChild(el);
	        });
	        playFish();
			}
        ,1000);
	}
	
	//called after bubble appears
	function playFish(){
		var $whale = document.getElementsByClassName('whale');
		var $whalefins = document.getElementsByClassName('whale-fin');
		var $whaletail = document.getElementsByClassName('whale-tail');
		
		$whale[0].style.display = 'inline';
		
		[].forEach.call($whalefins, function(el) {
	      var fin = el.getAttribute("class");
	      var rotateAngle = "20deg";
	      if(fin.indexOf("right") > -1){
	      	rotateAngle = "-"+rotateAngle;
	      }
	      $.Velocity(el, {rotateZ: rotateAngle}, {duration:5000, loop:true});
	    });
	    
	    $.Velocity($whale, {"margin-top": "22px"}, {duration:5000, loop:5});
	    
	}
	
	function animateTitle(){
		$.Velocity($title, {display:"block"}).then($.Velocity($title, "transition.flipBounceYIn"));
	}
	function animateLinks(){
		$.Velocity($floater, {display:"block"}).then($.Velocity($floater, "transition.swoopIn")).then(
				$allLinks.velocity({"margin-top":"4px"},{duration:2000,loop:true})
		);
	}
	function animateReactive(){
		$.Velocity($reactive, { opacity: 0.4 }, {duration: 500, loop:true});
	}
	
	function triggerTriangles(){
		[].forEach.call($triangles, function(el) {
        	el.style.opacity = 1;
        });
	}
	   
	function prepareNav() {
	  $('a[href*=#]').each(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
	    && location.hostname == this.hostname
	    && this.hash.replace(/#/,'') ) {
	      var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
	      var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
	       if ($target) {
	         var targetOffset = $target.offset().top-650;
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