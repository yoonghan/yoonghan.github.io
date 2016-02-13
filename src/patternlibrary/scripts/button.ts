class Button {
  constructor() {
    this.init();
  }

  init() {
    var buttons = document.getElementsByClassName('button');

    [].forEach.call(buttons, function(element) {
      element.addEventListener('mousedown', function(event) {
      var rippleName = 'ripple',
          target = event.target,
          rect = target.getBoundingClientRect(),
          ripple = target.getElementsByClassName(rippleName);

      [].forEach.call(ripple, function(ele) {
        ele.classList.remove(rippleName);
      });

      ripple = document.createElement('span');
      ripple.className = rippleName;
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
      target.appendChild(ripple);
      var top = event.pageY - rect.top - ripple.offsetHeight / 2 -  document.body.scrollTop;
      var left = event.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
      ripple.style.top = top + 'px';
      ripple.style.left = left + 'px';
      return false;
    });
  });
  }
}

export = Button;
