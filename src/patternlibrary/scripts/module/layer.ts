class Layer {
  constructor(tweenMax, timelineMax) {
    this.run(tweenMax, timelineMax);
  }

  run(tweenMax, timelineMax) {
    var image = document.getElementById('lyr-atom'),
        blog = document.getElementById('lyr-blog'),
        fixer = document.getElementById('lyr-fixer'),
        tl = new TimelineMax({repeat:-1});
    tl.add(tweenMax.to(image, 5, {rotation:'360', ease: Expo.easeOut}));
    tl.add(tweenMax.to(image, 8, {rotation:'-359', ease: Linear.easeOut}));
    tweenMax.to(blog, 10, {opacity:0.2, repeat: -1});
    tweenMax.to(fixer, 5, {'padding-bottom': '20px', repeat: -1, ease: Linear.easeOut});
  }
}

export = Layer;
