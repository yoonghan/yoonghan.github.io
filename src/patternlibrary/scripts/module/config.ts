require.config({
  paths:{
    'scrollToPlugin': '/cache/public/js/gsap/plugins/ScrollToPlugin',
    'tweenMax': '/cache/public/js/gsap/TweenMax',
    'timelineMax': '/cache/public/js/gsap/TimelineMax'
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
