class ScreenRefresh {

  private refreshElement;
  private height = 0;
  private width = 0;

  constructor() {
    this.refreshElement = document.createElement('div');
    this.refreshElement.setAttribute('class','wal-refresh');
    document.body.appendChild(this.refreshElement);
    this.changeAllLinkout();
  }

  changeAllLinkout() {
    let anchors = document.getElementsByTagName('a');
    let that = this;
    [].forEach.call(anchors, function(anchorElement, idx) {
      let attr = anchorElement.getAttribute('href');
      if(attr.indexOf('mailto') === -1) {
        anchorElement.addEventListener(
          'click',
          function(event) {
            that.expand();
          }
        );
      }
    });
  }

  expand() {
    //there will always and only one of this
    let refresh = <HTMLElement> document.getElementsByClassName('wal-refresh')[0];
    refresh.style.display = 'block';
    let action = 10;
    let that = this;
    //check who is bigger, width or height
    let expandVertical = document.body.clientHeight > document.body.clientWidth ? 'vh':'vw';
    let timer = setInterval(function() {
      that.height += 10 ; //adjusted according to smoothness
      that.width += 10; //adjust according to time.
      refresh.style.height = that.height + expandVertical;
      refresh.style.width = that.width + expandVertical;
      if(that.height >= 200) {
        clearTimeout(timer);
      }
    }, 10);
  }
}

new ScreenRefresh();
