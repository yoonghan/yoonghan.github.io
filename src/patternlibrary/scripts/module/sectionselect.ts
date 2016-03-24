class SectionSelect {

  private iconElements;
  private tweenMax;
  private switchOn:string = "_on";
  private activeOn:string = "active";

  constructor(tweenMax){
    var self = this;
    this.tweenMax = tweenMax;
    this.iconElements = document.getElementsByClassName('icon');

    [].forEach.call(this.iconElements, function(element) {

      var isIconListing = element.parentNode.classList.contains('icon-listing');

      element.addEventListener('click', function() {
        var position = this.offsetParent.offsetTop;
        if(position === 0) {
          position = this.offsetParent.offsetParent.offsetTop;
        }
        self.tweenMax.to(window, 0.5, {scrollTo:{y:position}, ease:Power2.easeOut});
        self.switchOnOff(this, (isIconListing? element.parentNode.getElementsByClassName('icon'): null));
      });
      self.checkElement(element);
    });
  }

  checkElement(element) {
    if(element.classList.contains(this.activeOn)) {
      this.turnOn(element);
    }
  }

  switchOnOff(element, listingInParent) {
    var self = this,
        icon = element.getElementsByTagName('use')[0],
        iconAttribute = icon.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
    if(element.classList.contains(this.activeOn)) {
      if(listingInParent === null) {
        this.turnOff(element);
      }
    }
    else {
      if(listingInParent !== null) {
        [].forEach.call(listingInParent, function(eachElement) {
          self.turnOff(eachElement);
        });
      }
      this.turnOn(element);
    }
  }

  turnOff(element) {
    this.turnSwitch(element, false);
  }

  turnOn(element) {
    this.turnSwitch(element, true);
  }

  turnSwitch(element, isToTurnOn) {
    var icon = element.getElementsByTagName('use')[0],
        iconAttribute = icon.getAttributeNS('http://www.w3.org/1999/xlink', 'href');

    if(isToTurnOn) {
      element.classList.add(this.activeOn);
      icon.setAttributeNS('http://www.w3.org/1999/xlink', 'href', iconAttribute + this.switchOn);
    }
    else {
      if(element.classList.contains(this.activeOn)) {
        iconAttribute = iconAttribute.substring(0, iconAttribute.length - this.switchOn.length);
        element.classList.remove(this.activeOn);
        icon.setAttributeNS('http://www.w3.org/1999/xlink', 'href', iconAttribute);
      }
    }
  }
}

export = SectionSelect;
