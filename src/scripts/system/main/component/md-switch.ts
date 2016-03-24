import {Component, provide, OnInit, EventEmitter} from 'angular2/core';
import {TooltipDirective} from '../directive/tooltip.directive';

@Component({
    selector: 'md-switch',
    inputs: ['idname', 'label', 'disabled', 'checked', 'toolTipMessage'],
    outputs: ['result'],
    template: `
      <label class="switch is-upgraded {{classEnable}} {{classChecked}} {{classFocus}}" [tooltip]="toolTipMessage">
       <input type="checkbox" id="{{idname}}" class="switch-input" (change)="onChange($event)" [checked]='checked' (focus)='onFocus()'>
       <span class="switch-label">{{label}}</span>
       <div class="switch-track"></div>
       <div class="switch-thumb" ><span class="switch-focus-helper"></span></div>
      </label>
    `,
    directives: [
      TooltipDirective
    ]
})

export class MdSwitch implements OnInit{
  private classEnable;
  private classChecked;
  private classFocus;
  private result: EventEmitter<boolean> = new EventEmitter();
  checked = false;
  disabled = false;

  constructor() {
  }

  checkDisabled() {
    if (this.disabled) {
      this.classEnable = 'is-disabled';
    } else {
      this.classEnable = '';
    }
  }

  checkToggleState() {
    if (this.checked) {
      this.classChecked = 'is-checked';
    } else {
      this.classChecked = '';
    }
  }

  updateClasses() {
    this.checkDisabled();
    this.checkToggleState();
  }

  onChange(event) {
    if(!this.disabled) {
      this.checked = event.srcElement.checked;
      this.updateClasses_();
      this.result.next(this.checked);
    };
  }

  onFocus() {
    if(!this.disabled) {
      this.classFocus = 'is-focused';
      window.setTimeout(function() {
        this.classFocus = '';
      }.bind(this), /** @type {number} */ 100);
    }
  }

  updateClasses_() {
    this.checkDisabled();
    this.checkToggleState();
  }

  ngOnInit () {
    let self = this;
    this.updateClasses_();
  }
}
