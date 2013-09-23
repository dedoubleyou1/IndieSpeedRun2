goog.provide('utilities.Timer');


//, timerDisplayLayer
utilities.Timer = function(tickFunc, finalFunc) {
  this.tickFunc = tickFunc;
  this.finalFunc = finalFunc;
  this.tick = 1000;
  this.totalTicks = 8;
  this.currentRunTime = 0;
  this.currentTicks = 0;
  //this.timerDisplayLayer = timerDisplayLayer;
};

utilities.Timer.prototype.start = function() {
  var that = this;
  var ticker = function ticker(dt) {
    that.currentRunTime += dt;
    console.log(dt, that, that.currentRunTime);
    if (that.currentRunTime >= that.tick) {
      that.currentTicks += 1;
      if (that.currentTicks >= that.totalTicks) {
        that.finalFunc();
        lime.scheduleManager.unschedule(ticker);
      } else {
        that.tickFunc();
        that.currentRunTime = 0;
      }
    }
  };
  lime.scheduleManager.schedule(ticker);
};

utilities.Timer.prototype.addTime = function(bonusTime) {
  this.currentRunTime -= bonusTime;
};

goog.exportSymbol('utilities.Timer', utilities.Timer);
