goog.provide('utilities.Timer');

var timerSettings = {
  tick: 5000,
  totalTicks: 8,
  currentRunTime: 0,
  currentTicks: 0
};

utilities.Timer = function(tickFunc, finalFunc, timerDisplayLayer) {
  this.tickFunc = tickFunc;
  this.finalFunc = finalFunc;
  this.timerDisplayLayer = timerDisplayLayer;
};

utilities.Timer.prototype.start = function() {
  var that = this;
  var tick = function tick(dt) {
    timerSettings.totalRunTime += dt;
    if (timerSettings.currentRunTime >= timerSettings.tick) {
      console.log('Tick');
      timerSettings.currentTicks += 1;
      if (timerSettings.currentTicks >= timerSettings.totalTicks) {
        that.finalFunct();
        lime.scheduleManager.unschedule(tick);
      } else {
        that.tickFunct();
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
