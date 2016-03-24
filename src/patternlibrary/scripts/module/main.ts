require([
  'main',
  'button',
  'sectionSelect',
  'plateSelect',
  'footer',
  'tweenMax',
  'timelineMax'
  ],
(main, button, sectionSelect, plateSelect, footer, tweenMax, timelineMax) => {
  console.log("from pattern library");
  var main = new main();
  var footer = new footer(tweenMax, timelineMax);
  new button();
  new sectionSelect(tweenMax);
  new plateSelect();
});

class Main {
    constructor() {
    }
}

export = Main;
