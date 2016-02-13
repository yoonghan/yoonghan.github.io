requirejs(['config'], function (config) {
  requirejs([
    'footer',
    'tweenMax',
    'timelineMax'
    ],
  (footer, tweenMax, timelineMax) => {
    new footer(tweenMax, timelineMax);
  });
});
