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
goog.require('lime.scheduleManager');
goog.require('utilities.Level');


// entrypoint

IndieSpeedRun2.start = function() {

  var director = new lime.Director(document.body,1024,768);
  
  var currentLevel = 0;
  
  var levels = [];
  levels.push({ mushroom: .4, olive: 0, anchovy: 0 });//introduce mushrooms
  levels.push({ mushroom: .3, olive: .2, anchovy: 0});
  levels.push({ mushroom: .2, olive: .2, anchovy: .15 });
  levels.push({ mushroom: 0, olive: 0, anchovy: .5 });
  
  
  
  //UPDATE
  lime.scheduleManager.schedule(function(dt){
    console.log(myNewLevel.isFinished());
    if(myNewLevel.isFinished()){
      myNewLevel.setFinished(false);
      nextLevel(1,currentLevel, director, levels);
    }
  });
  
  

  var myNewLevel = new utilities.Level(director, 4, 164,levels[0]);
  director.replaceScene(myNewLevel.levelScene);
  
  //listen for KEYBOARD events
  goog.events.listen(director, goog.events.EventType.KEYUP, function (e) {
    if (e.event.keyCode === 78) { //letter 'n'
      if(currentLevel+1 < levels.length){
        currentLevel++;
        myNewLevel = new utilities.Level(director, 4, 164, levels[currentLevel]);
        director.replaceScene(myNewLevel.levelScene);
      }
    }
    else if(e.event.keyCode === 80){ //p - previous level
      if(currentLevel-1 >= 0){
        currentLevel--;
        myNewLevel = new utilities.Level(director, 4, 164, levels[currentLevel]);
        director.replaceScene(myNewLevel.levelScene);
      }
    }
    else if(e.event.keyCode === 82){ //r - restart
        myNewLevel = new utilities.Level(director, 4, 164, levels[currentLevel]);
        director.replaceScene(myNewLevel.levelScene);
    }
  });
}

//LOCAL function
function nextLevel(changeType, currentLevel, director, levels){
      console.log("Are we GETTING here??");
      currentLevel++;
      myNewLevel = new utilities.Level(director, 4, 164, levels[currentLevel],nextLevel);
      director.replaceScene(myNewLevel.levelScene);

    /*if(changeType === 1){
      if(currentLevel+1 < levels.length){
        currentLevel++;
        myNewLevel = new utilities.Level(director, 4, 164, levels[currentLevel],nextLevel);
        director.replaceScene(myNewLevel.levelScene);
      }
    }
    else if(changeType === 0){
      myNewLevel = new utilities.Level(director, 4, 164, levels[currentLevel],nextLevel);
      director.replaceScene(myNewLevel.levelScene);
    }*/
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('IndieSpeedRun2.start', IndieSpeedRun2.start);
