goog.provide('utilities.Timer');

var timerSettings = {
  tick: 1000,
  totalTicks: 8,
  currentRunTime: 0,
  currentTicks: 0
};
//, timerDisplayLayer
utilities.Timer = function(tickFunc, finalFunc) {
  this.tickFunc = tickFunc;
  this.finalFunc = finalFunc;
  //this.timerDisplayLayer = timerDisplayLayer;
};

utilities.Timer.prototype.start = function() {
  var that = this;
  var tick = function tick(dt) {
    timerSettings.currentRunTime += dt;
    if (timerSettings.currentRunTime >= timerSettings.tick) {
      timerSettings.currentTicks += 1;
      if (timerSettings.currentTicks >= timerSettings.totalTicks) {
        that.finalFunc();
        lime.scheduleManager.unschedule(tick);
      } else {
        that.tickFunc();
        timerSettings.currentRunTime = 0;
      }
    }
  };
  lime.scheduleManager.schedule(tick);
};

utilities.Timer.prototype.addTime = function(bonusTime) {
  timerSettings.currentRunTime -= bonusTime;
};

goog.exportSymbol('utilities.Timer', utilities.Timer);
