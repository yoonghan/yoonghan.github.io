class Switch {
  private element_;
  private inputElement_;
  private boundMouseUpHandler;
  private boundChangeHandler;
  private boundFocusHandler;
  private boundBlurHandler;

  constructor() {
    this.init();
  }

  checkDisabled() {
    if (this.inputElement_.disabled) {
      this.element_.classList.add('is-disabled');
    } else {
      this.element_.classList.remove('is-disabled');
    }
  }

  checkToggleState() {
    if (this.inputElement_.checked) {
      this.element_.classList.add('is-checked');
    } else {
      this.element_.classList.remove('is-checked');
    }
  }

  updateClasses() {
    this.checkDisabled();
    this.checkToggleState();
  }

  onChange_() {
    this.updateClasses_();
  }

  blur_() {
    window.setTimeout(function() {
      this.inputElement_.blur();
    }.bind(this), /** @type {number} */ 100);
  }

  onMouseUp_(event) {
    this.blur_();
  }

  onFocus_(event) {
    this.element_.classList.add('is-focused');
  }

  onBlur_(event) {
    this.element_.classList.remove('is-focused');
  }

  updateClasses_() {
    this.checkDisabled();
    this.checkToggleState();
  }

  init() {
    let self = this;

    this.element_ = document.querySelector('.switch');
    this.inputElement_ = document.querySelector('.switch-input');

    var track = document.createElement('div');
    track.classList.add("switch-track");

    var thumb = document.createElement('div');
    thumb.classList.add("switch-thumb");

    var focusHelper = document.createElement('span');
    focusHelper.classList.add("switch-focus-helper");

    thumb.appendChild(focusHelper);

    this.element_.appendChild(track);
    this.element_.appendChild(thumb);

    this.boundMouseUpHandler = this.onMouseUp_.bind(self);

    this.boundChangeHandler = this.onChange_.bind(self);
    this.boundFocusHandler = this.onFocus_.bind(self);
    this.boundBlurHandler = this.onBlur_.bind(self);

    this.inputElement_.addEventListener('change', this.boundChangeHandler);
    this.inputElement_.addEventListener('focus', this.boundFocusHandler);
    this.inputElement_.addEventListener('blur', this.boundBlurHandler);
    this.element_.addEventListener('mouseup', this.boundMouseUpHandler);

    this.updateClasses_();
    this.element_.classList.add('is-upgraded');
  }
}

export = Switch;
