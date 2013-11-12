goog.provide('utilities.Timer');

goog.require('lime.scheduleManager');

var settings = {
  TICK: 5000,
  TOTAL_TICKS: 8
};

//, timerDisplayLayer
utilities.Timer = function(tickFunc, finalFunc) {
  this.tickFunc = tickFunc;
  this.finalFunc = finalFunc;

  this.currentRunTime = 0;
  this.currentTicks = 0;
  //this.timerDisplayLayer = timerDisplayLayer;
};

utilities.Timer.prototype.start = function() {
  var that = this;
  var ticker = function ticker(dt) {
    that.currentRunTime += dt;
    if (that.currentRunTime >= settings.TICK) {
      that.currentTicks += 1;
      if (that.currentTicks >= settings.TOTAL_TICKS) {
        that.tickFunc();
        that.finalFunc();
        lime.scheduleManager.unschedule(ticker);
      } else {
        that.tickFunc();
        that.currentRunTime = 0;
      }
    }
  };
  lime.scheduleManager.schedule(ticker);
  return function() {
     lime.scheduleManager.unschedule(ticker);
  }
};

utilities.Timer.prototype.addTime = function(bonusTime) {
  this.currentRunTime -= bonusTime;
};

goog.exportSymbol('utilities.Timer', utilities.Timer);
