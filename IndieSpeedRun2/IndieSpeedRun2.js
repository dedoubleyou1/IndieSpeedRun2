//set main namespace
goog.provide('IndieSpeedRun2');


//get requirements
goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.scheduleManager');
goog.require('utilities.Level');


// entrypoint

IndieSpeedRun2.start = function() {

  var director = new lime.Director(document.body, 1024, 768);

  var currentLevel = 0;

  var levels = [
    { mushroom: 0.4, olive: 0, anchovy: 0},
    { mushroom: 0.0, olive: 0.4, anchovy: 0},
    { mushroom: 0.3, olive: 0.2, anchovy: 0},
    { mushroom: 0.2, olive: 0.4, anchovy: 0},
    { mushroom: 0.5, olive: 0, anchovy: 0.25 },
    { mushroom: 0.2, olive: 0.2, anchovy: 0.15}
  ];

  var myLevel = new utilities.Level(director, 4, 164, levels[currentLevel]);

  //UPDATE
  lime.scheduleManager.schedule(function(dt) {
    if (myLevel.isFinished()) {
      myLevel.setFinished(false);
      currentLevel += 1;
      myLevel = new utilities.Level(director, 4, 164, levels[currentLevel]);
      director.replaceScene(myLevel.levelScene);
    }
  });

  director.replaceScene(myLevel.levelScene);
};


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('IndieSpeedRun2.start', IndieSpeedRun2.start);
