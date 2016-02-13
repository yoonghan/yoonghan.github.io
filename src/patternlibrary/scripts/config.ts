require.config({
  paths:{
    'scrollToPlugin': '/public/js/gsap/plugins/ScrollToPlugin',
    'tweenMax': '/public/js/gsap/TweenMax',
    'timelineMax': '/public/js/gsap/TimelineMax'
  },
  shim: {
    "tweenMax": {
      deps:    ["scrollToPlugin"],
      exports: "TweenMax"
    },
    "timelineMax": {
        deps:    ["tweenMax"],
        exports: "TimelineMax"
    },
    "scrollToPlugin": {
      exports: "ScrollToPlugin"
    }
  },
  deps:["main"]
});
