function loadDeferredStyles(componentName) {
  var stylesheet = document.createElement('link');
  stylesheet.href = componentName;
  stylesheet.rel = "stylesheet";
  stylesheet.type = "text/css";
  document.body.appendChild(stylesheet);
}

function deferStylesheet(componentName) {
  var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var timerFunc = function() {
    window.setTimeout(function() {
      loadDeferredStyles(componentName);
    }, 0);
  };
  if (raf) raf(timerFunc);
  else window.addEventListener('load', loadDeferredStyles(componentName));
};
