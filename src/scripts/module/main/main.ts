requirejs(['config'], function (config) {
  requirejs([
    'main',
    'button',
    'sectionselect',
    'plateselect',
    'footer',
    'tweenMax',
    'timelineMax'
    ],
  (main, button, sectionSelect, plateSelect, footer, tweenMax, timelineMax) => {
    var main = new main();
    var footer = new footer(tweenMax, timelineMax);
    new button();
    new sectionSelect(tweenMax);
    new plateSelect();
  });
});

class Main {
    constructor() {
    }
}

export = Main;
