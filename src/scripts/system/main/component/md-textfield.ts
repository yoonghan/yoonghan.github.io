import {Component, provide, OnInit, EventEmitter} from 'angular2/core';

@Component({
    selector: 'md-textfield',
    inputs: ['idname', 'label', 'disabled', 'maxRows'],
    outputs: ['result'],
    template: `
      <div class="textfield is-upgraded {{classFocus}} {{classEnable}} {{classDirty}}">
        <input type="text" id="{{idname}}" class="textfield-input" (keyup)="updateClasses()" (keydown)="onKeyDown($event)" (focus)="onFocus()" (blur)="onBlur()" (reset)="onReset()" [(ngModel)]="inputVal" [disabled]="disabled">
        <label class="textfield-label">{{label}}</label>
      </div>
    `
})

export class MdTextField implements OnInit{

    private CssClasses_ = {
      LABEL: 'mdl-textfield__label',
      INPUT: 'mdl-textfield__input',
      IS_DIRTY: 'is-dirty',
      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled',
      IS_INVALID: 'is-invalid',
      IS_UPGRADED: 'is-upgraded'
    };
    private result: EventEmitter<string> = new EventEmitter();
    private classFocus;
    private classDirty;
    private classEnable;
    private disabled;
    private inputVal;
    private maxRows;

    onKeyDown(event) {
      let currentRowCount = event.target.value.split('\n').length;
      if (event.keyCode === 13) {
        if (currentRowCount >= this.maxRows) {
          event.preventDefault();
        }
      }
    }

    onFocus() {
      this.classFocus = this.CssClasses_.IS_FOCUSED;
    }

    onBlur() {
      this.classFocus='';
      this.result.next(this.inputVal);
    }

    onReset() {
      this.updateClasses();
    }

    updateClasses() {
      this.checkDisabled();
      if(!this.disabled) {

        //this.checkValidity();
        this.checkDirty();
        this.result.next(this.inputVal);
      }
    };

    checkDisabled() {
      if (this.disabled) {
        this.classEnable = this.CssClasses_.IS_DISABLED;
      } else {
        this.classEnable = '';
      }
    };

    checkValidity() {
/*      if (input_.validity) {
        if (input_.validity.valid) {
          element_.classList.remove(this.CssClasses_.IS_INVALID);
        } else {
          element_.classList.add(this.CssClasses_.IS_INVALID);
        }
      }*/
    };

    checkDirty() {
      if (this.inputVal && this.inputVal.length > 0) {
        this.classDirty = this.CssClasses_.IS_DIRTY;
      } else {
        this.classDirty = '';
      }
    };

    disable() {
      this.disabled = true;
      this.updateClasses();
    };

    enable() {
      this.disabled = false;
      this.updateClasses();
    };

    change(value) {
      this.inputVal = value || '';
      this.updateClasses();
    };

    ngOnInit () {

      if (isNaN(this.maxRows)) {
        this.maxRows = -1;
      }
      //let invalid = element_.classList.contains('is-invalid');
      this.updateClasses();

      //if (invalid) {
      //  element_.classList.add('is-invalid');
      //}
      //if (input_.hasAttribute('autofocus')) {
      //      element_.focus();
      //      checkFocus();
      //    }
    }
}
