//set main namespace
goog.provide('IndieSpeedRun2');


//get requirements
goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Spawn');
goog.require('lime.scheduleManager');
goog.require('utilities.Level');


// entrypoint

IndieSpeedRun2.start = function() {

  var director = new lime.Director(document.body, 1024, 768);

  var currentLevel = 0;
  var pop = new lime.animation.Spawn(
    new lime.animation.Sequence(
      new lime.animation.ScaleTo(0).setDuration(0),
      new lime.animation.ScaleTo(1).setDuration(2)
    ),
    new lime.animation.Sequence(
      new lime.animation.FadeTo(0).setDuration(0),
      new lime.animation.FadeTo(1).setDuration(2)
    )
  );

  var levels = [
    { mushroom: 0.6, olive: 0, anchovy: 0},
    { mushroom: 0.4, olive: 0.4, anchovy: 0},
    { mushroom: 0.3, olive: 0.2, anchovy: 0},
    { mushroom: 0.2, olive: 0.4, anchovy: 0},
    { mushroom: 0.5, olive: 0, anchovy: 0.25 },
    { mushroom: 0.2, olive: 0.2, anchovy: 0.15}
  ];

  var myLevel = new utilities.Level(director, 4, 164, levels[currentLevel]);

  //UPDATE
  lime.scheduleManager.schedule(function(dt) {
    if (!!myLevel.isFinished()) {
      console.log(myLevel.isFinished());
      if (myLevel.isFinished() === 'Acquision Successful') {
        if (currentLevel + 1 < levels.length) {
          currentLevel += 1;
        } else {
          currentLevel = 0;
        }
      }
      var winLabel = new lime.Label()
        .setText(myLevel.isFinished())
        .setFontFamily('Verdana')
        .setFontColor(0, 0, 0, 0)
        .setFontSize(30)
        .setFontWeight('bold')
        .setSize(400, 50)
        .setPosition(512, 384)
      winLabel.runAction(pop);
      myLevel.levelScene.appendChild(winLabel);
      myLevel.setFinished(false);
      goog.events.listen(pop, lime.animation.Event.STOP, function() {
        pop.removeTarget(winLabel);
        myLevel = new utilities.Level(director, 4, 164, levels[currentLevel]);
        director.replaceScene(myLevel.levelScene);
      });
    }
  });

  director.replaceScene(myLevel.levelScene);
};


//this is required for outside access after
//code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('IndieSpeedRun2.start', IndieSpeedRun2.start);
