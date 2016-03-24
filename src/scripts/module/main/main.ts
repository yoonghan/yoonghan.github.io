requirejs(['config'], function (config) {
  requirejs([
    'button',
    'sectionselect',
    'plateselect',
    'tweenMax',
    'timelineMax'
    ],
  (button, sectionSelect, plateSelect, tweenMax, timelineMax) => {
    new button();
    new sectionSelect(tweenMax);
    new plateSelect();
  });
});
