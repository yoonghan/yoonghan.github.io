define(["require", "exports"], function (require, exports) {
    require([
        'main',
        'button',
        'sectionselect',
        'plateselect',
        'footer',
        'tweenMax',
        'timelineMax'
    ], function (main, button, sectionSelect, plateSelect, footer, tweenMax, timelineMax) {
        var main = new main();
        var footer = new footer(tweenMax, timelineMax);
        new button();
        new sectionSelect(tweenMax);
        new plateSelect();
    });
    var Main = (function () {
        function Main() {
        }
        return Main;
    })();
    return Main;
});
