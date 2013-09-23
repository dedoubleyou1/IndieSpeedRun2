goog.provide('utilities.Timer');

var timerSettings = {
  tick: 5000
  totalTicks: 8
};

function timerRun(that) {
  var currentRunTime = 0;
  var currentTicks = 0;
  var tick = function tick(dt) {
    totalRunTime += dt;
    if (currentRunTime >= timerSettings.tick) {
      currentTicks += 1;
      if (currentTicks >= timerSettings.totalTicks) {
        that.finalFunct();
        lime.scheduleManager.unschedule(tick);
      } else {
        that.tickFunct();
        currentRunTime = 0;
      }
    }
  };
  lime.scheduleManager.schedule(tick);
}

utilities.Timer = function(tickFunc, finalFunc, timerDisplayLayer) {
  this.tickFunc = tickFunc;
  this.finalFunc = finalFunc;
  this.timerDisplayLayer = timerDisplayLayer;
};

utilities.Timer.prototype.start = function() {
  timerRun(this);
};

utilities.Timer.prototype.addTime = function(bonusTime) {
};

goog.exportSymbol('utilities.Timer', utilities.Timer);
