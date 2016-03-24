class Footer {

  private body = document.body;
  private dupFooter;
  private tweenMax;
  private timelineMax;

  constructor(tweenMax, timelineMax) {
    var footer = document.getElementById('footer');

    this.dupFooter = footer.cloneNode(true);
    this.tweenMax = tweenMax;
    this.timelineMax = timelineMax;

    this.duplicateFooter();

    this.addClick(footer, this.dupFooter);
  }

  duplicateFooter() {
    var dupFooter = this.dupFooter;
    dupFooter.style.bottom = 0;
    dupFooter.style.position = 'fixed';
    dupFooter.style.display = 'none';

    var trademark = dupFooter.getElementsByClassName('footer-trade')[0];
    trademark.style.position ='fixed';
    trademark.style.bottom = 0;

    var comment = dupFooter.getElementsByClassName('footer-info')[0];
    comment.style.display = 'block';
    document.body.appendChild(dupFooter);
  }

  addClick(footer, dupFooter) {
    var footerClickOpen = footer.getElementsByClassName('footer-pointer')[0],
      footerClickClose = dupFooter.getElementsByClassName('footer-pointer')[0],
      that = this;
    footer.addEventListener(
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
    var dupFooter = that.dupFooter,
        pointer = dupFooter.getElementsByClassName('footer-pointer')[0],
        tweenMax = that.tweenMax;
    dupFooter.style.display = 'block';
    tweenMax.to(pointer, 0.3, {rotation:'180'});
    tweenMax.to(dupFooter, 0.3, {height: '100vh'});
  }

  execClose(that) {
    var dupFooter = that.dupFooter,
        pointer = dupFooter.getElementsByClassName('footer-pointer')[0],
        tweenMax = that.tweenMax;
    tweenMax.to(pointer, 0.3, {rotation:'0'});
    tweenMax.to(dupFooter, 0.3, {height: '50px', onComplete: function(){dupFooter.style.display = 'none';}});
  }
}

export = Footer;
