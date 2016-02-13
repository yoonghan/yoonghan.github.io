require.config({
    paths: {
        'scrollToPlugin': '/cache/js/lib/gsap/plugins/ScrollToPlugin',
        'tweenMax': '/cache/js/lib/gsap/TweenMax',
        'timelineMax': '/cache/js/lib/gsap/TimelineMax'
    },
    shim: {
        "tweenMax": {
            deps: ["scrollToPlugin"],
            exports: "TweenMax"
        },
        "timelineMax": {
            deps: ["tweenMax"],
            exports: "TimelineMax"
        },
        "scrollToPlugin": {
            exports: "ScrollToPlugin"
        }
    },
    deps: ["main"]
});
