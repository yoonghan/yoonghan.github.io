define(["require", "exports"], function (require, exports) {
    var PlateSelect = (function () {
        function PlateSelect() {
            var self = this, plateListing = document.getElementsByClassName('plate-listing');
            [].forEach.call(plateListing, function (element, idx) {
                var plateElements = element.getElementsByClassName('plate-trigger'), platesContainer = element.getElementsByClassName('plate');
                self.initPlate(plateElements, platesContainer);
            });
        }
        PlateSelect.prototype.initPlate = function (plateElements, platesContainer) {
            new InnerPlate(plateElements, platesContainer);
        };
        ;
        return PlateSelect;
    })();
    var InnerPlate = (function () {
        function InnerPlate(plateElements, platesContainer) {
            this.activeOn = "active";
            var self = this;
            this.plateElements = plateElements;
            this.platesContainer = platesContainer;
            [].forEach.call(this.plateElements, function (element, idx) {
                element.addEventListener('click', function () {
                    self.showElement(this, idx);
                });
                self.checkElement(element, idx);
            });
        }
        InnerPlate.prototype.showElement = function (element, idx) {
            var container = this.platesContainer[idx];
            if (typeof container !== 'undefined') {
                this.closeAllPlates();
                element.classList.add(this.activeOn);
                container.style.display = 'block';
            }
        };
        ;
        InnerPlate.prototype.checkElement = function (element, idx) {
            if (element.classList.contains(this.activeOn)) {
                this.showElement(element, idx);
            }
        };
        ;
        InnerPlate.prototype.closeAllPlates = function () {
            [].forEach.call(this.plateElements, function (element) {
                element.classList.remove(this.activeOn);
            });
            [].forEach.call(this.platesContainer, function (element) {
                element.style.display = "none";
            });
        };
        ;
        return InnerPlate;
    })();
    return PlateSelect;
});
