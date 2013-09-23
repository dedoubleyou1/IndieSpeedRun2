//set main namespace
goog.provide('IndieSpeedRun2');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('utilities.Level');


// entrypoint

IndieSpeedRun2.start = function() {

  var director = new lime.Director(document.body,1024,768);

  var toppingChances = {
    mushroom: .26,
    olive: .15,
    anchovy: .05
  }

  var myNewLevel = new utilities.Level(4, 164,toppingChances);
  director.replaceScene(myNewLevel.levelScene);
//  myNewLevel.randomizeLevel();
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('IndieSpeedRun2.start', IndieSpeedRun2.start);
