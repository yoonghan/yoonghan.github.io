class Footer {

  private body = document.body;
  private dupFooter;
  private dupFooterPointer;
  private height = 10;
  private degrees = 0;

  constructor() {
    let footer = document.getElementById('footer');
    let footerExpand = footer.getElementsByClassName("technology")[0];
    this.dupFooter = footerExpand.cloneNode(true);
    this.duplicateFooter();
    this.addClick(footerExpand, this.dupFooter);
  }

  duplicateFooter() {
    this.dupFooter.style.bottom = 0;
    this.dupFooter.style.position = 'fixed';
    this.dupFooter.style.zIndex = 99;
    this.dupFooter.style.display = 'none';
    var trademark = this.dupFooter.getElementsByClassName('footer-trade')[0];
    trademark.style.position ='fixed';
    trademark.style.bottom = 0;
    var comment = this.dupFooter.getElementsByClassName('footer-info')[0];
    comment.style.display = 'block';
    document.body.appendChild(this.dupFooter);
  }

  addClick(footerExpand, dupFooter) {
    var footerClickOpen = footerExpand.getElementsByClassName('footer-pointer')[0],
        that = this;
    this.dupFooterPointer = dupFooter.getElementsByClassName('footer-pointer')[0];

    footerExpand.addEventListener(
      'click',
      function(event) {
        that.execOpen(that);
      }
    );
    dupFooter.addEventListener(
      'click',
      function(event) {
        that.execClose(that);
      }
    );
  }

  execOpen(that) {
    that.setTimerOpen(that.dupFooter, that.dupFooterPointer, true, that);
  }

  execClose(that) {
    that.setTimerOpen(that.dupFooter, that.dupFooterPointer, false, that);
  }

  setTimerOpen(dupFooter, pointer, open, that) {
    var action = -1;

    if(open) {
      action = 1;
      that.dupFooter.style.display = 'block';
    };

    if(that.timer) {
      window.clearTimeout(that.timer);
    };

    that.timer = setInterval(function() {
      that.height += (5 * action) ; //adjusted according to smoothness
      that.degrees += (10 * action); //adjust according to time.
      that.dupFooter.style.height = that.height + 'vh';
      pointer.style.transform = "rotate(" + that.degrees + "deg)"
      if(that.height <= 10 || that.height >= 100) {
        clearTimeout(that.timer);
        if(that.height <= 10) {
          dupFooter.style.display = 'none';
        }
      }
    }, 5);
  }
}

new Footer();
