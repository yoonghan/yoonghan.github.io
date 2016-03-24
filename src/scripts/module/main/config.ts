requirejs.config({
  paths:{
    'scrollToPlugin': '/public/js/gsap/plugins/ScrollToPlugin',
    'tweenMax': '/public/js/gsap/TweenMax',
    'timelineMax': '/public/js/gsap/TimelineMax',
    'button':'../button',
    'sectionselect':'../sectionselect',
    'plateselect':'../plateselect'
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
  }
});
