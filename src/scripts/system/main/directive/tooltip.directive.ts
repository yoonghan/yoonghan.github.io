import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
  selector: '[tooltip]',
  host: {
    '(mouseleave)': 'onMouseLeave()',
    '(mouseenter)': 'onMouseEnter($event)'
  }
})

export class TooltipDirective{
  @Input('tooltip') message: string;

  private CssClasses_ = {
    IS_ACTIVE: 'is-active',
    BOTTOM: 'tooltip-bottom',
    LEFT: 'tooltip-left',
    RIGHT: 'tooltip-right',
    TOP: 'tooltip-top'
  };

  private toolTipElement;

  constructor(private element: ElementRef) {
    var ele = this.element.nativeElement;
    var node = document.createElement('div');
    var attr = document.createAttribute("class");
    attr.value = 'tooltip';
    node.setAttributeNode(attr);
    ele.appendChild(node);
    this.toolTipElement = node;
  }

  onMouseEnter(event) {
    var ele = this.toolTipElement,
    if(ele) {
      var element = this.element.nativeElement,
          props = element.getBoundingClientRect(),
          left = props.left + (props.width / 2),
          top = props.top + (props.height / 2),
          marginLeft = -1 * (ele.offsetWidth / 2),
          marginTop = -1 * (ele.offsetHeight / 2);

      ele.innerText = this.message;

      if (ele.classList.contains(this.CssClasses_.LEFT) || ele.classList.contains(this.CssClasses_.RIGHT)) {
        left = (props.width / 2);
        if (top + marginTop < 0) {
          ele.style.top = 0;
          ele.style.marginTop = 0;
        } else {
          ele.style.top = top + 'px';
          ele.style.marginTop = marginTop + 'px';
        }
      } else {
        if (left + marginLeft < 0) {
          ele.style.left = 0;
          ele.style.marginLeft = 0;
        } else {
          ele.style.left = left + 'px';
          ele.style.marginLeft = marginLeft + 'px';
        }
      }

      if (ele.classList.contains(this.CssClasses_.TOP)) {
        ele.style.top = props.top - ele.offsetHeight - 10 + 'px';
      } else if (ele.classList.contains(this.CssClasses_.RIGHT)) {
        ele.style.left = props.left + props.width + 10 + 'px';
      } else if (ele.classList.contains(this.CssClasses_.LEFT)) {
        ele.style.left = props.left - ele.offsetWidth - 10 + 'px';
      } else {
        ele.style.top = props.top + props.height + 10 + 'px';
      }

      ele.classList.add(this.CssClasses_.IS_ACTIVE);
    }
  };

  onMouseLeave() {
    var ele = this.toolTipElement;
    ele.classList.remove(this.CssClasses_.IS_ACTIVE);
  }
}
