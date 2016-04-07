import {Directive, ElementRef} from 'angular2/core';

@Directive({
  selector: '[ripple]',
  host: {
    '(mousedown)': 'onMouseDown($event)'
  }
})

export class RippleDirective {
    constructor(private element: ElementRef) {}

    onMouseDown(event:any) {
      var rippleName = 'ripple',
        ele = this.element.nativeElement,
        rect = ele.getBoundingClientRect(),
        ripple = ele.getElementsByClassName(rippleName);

      [].forEach.call(ripple, function(classElement) {
        ele.removeChild(classElement);
      });

      ripple = document.createElement('span');
      ripple.className = rippleName;
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
      ele.appendChild(ripple);

      var top = event.pageY - rect.top - ripple.offsetHeight / 2 -  document.body.scrollTop;
      var left = event.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
      ripple.style.top = top + 'px';
      ripple.style.left = left + 'px';
    }

}
