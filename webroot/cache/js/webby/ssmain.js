'use strict';
(function(global){
	var $body = $('body');
		
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
		dotsHtml = "",
		$dots;
	
	if (window.location.hash) {
		dotsCount = window.location.hash.slice(1);
	} else {
		dotsCount = isMobile ? (isAndroid ? 40 : 60) : (isChrome ? 200 : 125);
	}
	
	for (var i = 0; i < dotsCount; i++) {
		dotsHtml += "<div class='ball'></div>";
	}
	
	$dots = $(dotsHtml);
	
	var $container = $("#container");
	
	var screenWidth = window.screen.availWidth,
		screenHeight = window.screen.availHeight,
		chromeHeight = screenHeight - (document.documentElement.clientHeight || screenHeight);
	
	var translateZMin = -725,
		translateZMax = 600;
	
	$container
		.css("perspective-origin", screenWidth/2 + "px " + ((screenHeight * 0.45) - chromeHeight) + "px")
		.css("perspective", "100px");
	
	if (isWebkit) {
		$dots.css("boxShadow", "0px 0px 4px 0px #4bc2f1");
	}
	
	var loading = [
	    { elements: $body, properties: { width: '20%' } },
	    { elements: $body, properties: { width: '30%' } },
	    { elements: $body, properties: { width: '50%' } },
	    { elements: $body, properties: { width: '100%' } },
	    { elements: $body, properties: { height: '100%' }, options: { 
	      complete: function () {
	        $('html').css({ background: '#000' });
	        $('body').css({ "min-width": '480px' });
	        $('.section').css( {display:"block"} );
	     	$dots.appendTo($container);
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
	
	var modified = false;
	var flipper = 0;
	var controller = new ScrollMagic.Controller();
	
	function triggerScrollMagic(){
		var duration = $(".box").css("height");
		var split = $(".section").css("width");
		
		var content1 = 
			"<a href='//login.jomjaring.com'>"+
			"<table><tr>"+
			"		<td colspan='2'>"+
			"			<span class='link'>SCHEDULER</span>"+
			"		</td>"+
			"	</tr>"+
			"	<tr>"+
			"		<td width='100'>"+
			"			<div class='imageIcon'>"+
			"				<img src='/cache/img/calendar.png'>"+
			"			</div>"+
			"		</td>"+
			"		<td>"+
			"			<div>"+
			"			Our first experimental but full scale reservation system."+
			"			It's free and it's public, the usage is way simpler than anything you can find online!"+
			"			Check it out and have a try."+
			"			<br><br>"+
			"			Official website is @ <strong>http://login.jomjaring.com</strong>"+
			"		</div>"+
			"	</td>"+
			"	<tr></table>"
			"</a>";
			
		var content2 =
			"<table><tr>"+ 
			"  <tr>"+
			"    <td colspan='2'>"+
			"      <span class='link footer-color'>JOM Jaring</span>"+
			"    </td>"+
			"  </tr>"+
			"  <tr>"+
			"    <td>"+
			"      <div>"+
			"        This link is created based on interest.<br>"+
			"        It is currently hosted on <strong class='footer-color'>OpenShift</strong>, <strong class='footer-color'>Play Framework</strong> and <strong class='footer-color'>NodeJS</strong> platform."+
			"		<br><br>You are welcomed to contact us via <a href='mailto:mailyoonghan@gmail.com'>mailyoonghan@gmail.com</a>"+
			"      </div>"+
			"      <div class='footer'>"+
			"        This site was last updated on May 2015"+
			"      </div>"+
			"    </td>"+
			"  <tr>";
		
		
		$("#content").html(content1);
		
		new ScrollMagic.Scene({triggerElement: '#trigger1_2'})
					.setVelocity(".part2head", { colorRed: "100%" })
					.addTo(controller);
		
		$(".part2reactive").velocity({ opacity: 0.2 }, {duration: 500, loop:true});

		
		var newSplit=Math.floor(((+split.substring(0,split.length-2))-300) / 4);
		for(var cnt=3; cnt > -1; cnt--){
			new ScrollMagic.Scene({triggerElement: "#trigger1", offset: cnt*50})
					.setVelocity(".quote-"+cnt, { left: (cnt*newSplit)+"px", top: (cnt*30+20)+"px" }, [ 250, 15 ])
					.addTo(controller);
		}
		
		var newDuration=(+duration.substring(0,duration.length-2));
		var scene = new ScrollMagic.Scene({triggerElement: "#trigger2", duration: newDuration, offset: Math.floor(newDuration/2)})
					.on("progress", function () {
						var progress = scene.progress();
						
						if(!modified && progress > 0.5){
							modified = true;
							$("#content").html(content2);
							$(".box").toggleClass("flip-image");
						}
						if(modified && progress < 0.5){
							modified = false;
							$("#content").html(content1);
							$(".box").toggleClass("flip-image");
						}
						var newCount = (modified? 1-progress:progress) * 180;
						$(".box").css({transform:"rotateY("+newCount+"deg)"});
					})
					.setPin("#parallaxContainer")
					.addTo(controller);
	}
}(this));