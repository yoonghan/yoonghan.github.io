define([
  'tweenMax',
  'timelineMax'
], function (tweenMax, timelineMax) {
  var image = document.getElementById('lyr-atom'),
      tl = new TimelineMax({repeat:-1});
  tl.add(tweenMax.to(image, 10, {rotation:'360', ease: Expo.easeOut,}));
  tl.add(tweenMax.to(image, 10, {rotation:'-360', ease: Linear.easeOut}));
});
