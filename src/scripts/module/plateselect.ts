class PlateSelect {

  constructor() {
    var self = this,
      plateListing = document.getElementsByClassName('plate-listing');

    [].forEach.call(plateListing, function(element, idx) {
      var plateElements = element.getElementsByClassName('plate-trigger'),
          platesContainer = element.getElementsByClassName('plate');
      self.initPlate(plateElements, platesContainer);
    });
  }

  initPlate(plateElements, platesContainer) {
    new InnerPlate(plateElements, platesContainer);
  };

}

class InnerPlate {

  private plateElements;
  private platesContainer;
  private activeOn:string = "active";
  private moveLeft:string = "move-left";
  private moveRight:string = "move-right";

  constructor(plateElements, platesContainer) {
    var self = this;

    this.plateElements = plateElements;
    this.platesContainer = platesContainer;

    [].forEach.call(this.plateElements, function(element, idx) {
      element.addEventListener('click', function() {
        self.showElement(this, idx);
      });

      self.checkElement(element, idx);
    });
  }

  showElement(element, idx) {
    var container = this.platesContainer[idx];
    if(typeof container !== 'undefined') {
      this.closeAllPlates(idx);
      this.openPlate(container);
    }
  };

  checkElement(element, idx) {
    if(element.classList.contains(this.activeOn)) {
        this.showElement(element, idx);
    }
  };

  closeAllPlates(plateIdx: Number) {
    var self = this;

    [].forEach.call(this.plateElements, function(element) {
      element.classList.remove(this.activeOn);
    });
    [].forEach.call(this.platesContainer, function(element, idx) {
      if(idx !== plateIdx) {
        self.closePlate(element, self.isMoveLeft(idx, plateIdx));
      }
    });
  };

  isMoveLeft(idx: Number, plateIdx: Number) {
    return idx < plateIdx;
  };

  openPlate(plateElement) {
    plateElement.classList.remove(this.moveLeft);
    plateElement.classList.remove(this.moveRight);
    plateElement.classList.add(this.activeOn);
  };

  closePlate(plateElement, moveLeft: Boolean) {
    plateElement.classList.remove(this.activeOn);
    if(moveLeft) {
      plateElement.classList.remove(this.moveRight);
      plateElement.classList.add(this.moveLeft);
    } else {
      plateElement.classList.remove(this.moveLeft);
      plateElement.classList.add(this.moveRight);
    }
  };

}

export = PlateSelect;
