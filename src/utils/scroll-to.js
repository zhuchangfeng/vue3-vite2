Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    // eslint-disable-next-line no-extra-parens
    return (c / 2) * t * t + b;
  }
  t--;
  return -(c / 2) * (t * (t - 2) - 1) + b;
};
export default class To {
  constructor(to, duration = 500, callback) {
    this.to = to;
    this.duration = duration;
    this.callback = callback;
  }
  // 滚动动画
  requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  scrollTo() {
    const { duration, callback, requestAnimFrame, move, position, to } = this;
    const start = position();
    const change = to - start;
    const increment = 20;
    let currentTime = 0;
    const animateScroll = function () {
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      move(val);
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      } else {
        callback && typeof callback === 'function' && callback();
      }
    };
    animateScroll();
  }
  move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }
  position() {
    return (
      document.documentElement.scrollTop ||
      document.body.parentNode.scrollTop ||
      document.body.scrollTop
    );
  }
}
