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
      this.closeAllPlates();
      element.classList.add(this.activeOn);
      container.style.display = 'block';
    }
  };

  checkElement(element, idx) {
    if(element.classList.contains(this.activeOn)) {
        this.showElement(element, idx);
    }
  };

  closeAllPlates() {
    [].forEach.call(this.plateElements, function(element) {
      element.classList.remove(this.activeOn);
    });
    [].forEach.call(this.platesContainer, function(element) {
      element.style.display = "none";
    });
  };

}

export = PlateSelect;
