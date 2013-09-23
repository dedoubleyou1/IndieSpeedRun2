goog.provide('utilities.Level');

//get requirements

goog.require('lime.Circle');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.scheduleManager');
goog.require('utilities.ConvertCoordinates');
goog.require('utilities.Cursor');
goog.require('utilities.NewStruct');
goog.require('utilities.Timer');
goog.require('utilities.Topping');

utilities.Level = function(director, size, triangleHeight, toppingChances) {

  this.finished = false;
  

  var newLevel = new lime.Scene();

  var backgroundLayer = new lime.Layer();
  newLevel.appendChild(backgroundLayer);
  var toppingsLayer = new lime.Layer().setPosition(512, 384);
  newLevel.appendChild(toppingsLayer);
  var hudLayer = new lime.Layer().setPosition(0,0);
  newLevel.appendChild(hudLayer);
  var cursorLayer = new lime.Layer();
  newLevel.appendChild(cursorLayer);

  var levelSlices = [];
  levelSlices[0] = new lime.Sprite()
    .setFill('assets/pizza_sliced_0.png');
  levelSlices[1] = new lime.Sprite()
    .setFill('assets/pizza_sliced_1.png');
  levelSlices[2] = new lime.Sprite()
    .setFill('assets/pizza_sliced_2.png');
  levelSlices[3] = new lime.Sprite()
    .setFill('assets/pizza_sliced_3.png');
  levelSlices[4] = new lime.Sprite()
    .setFill('assets/pizza_sliced_4.png');
  levelSlices[5] = new lime.Sprite()
    .setFill('assets/pizza_sliced_5.png');
  levelSlices[6] = new lime.Sprite()
    .setFill('assets/pizza_sliced_6.png');
  levelSlices[7] = new lime.Sprite()
    .setFill('assets/pizza_sliced_7.png');

  for (var i = levelSlices.length - 1; i >= 0; i--) {
    levelSlices[i].setPosition(512, 384).setSize(768, 768);
    backgroundLayer.appendChild(levelSlices[i]);
  }

  var levelData = new utilities.NewStruct(size);
  var powerUps = false;
  var mouseActive = true;
  var cursor = new utilities.Cursor(director, cursorLayer, 'pepperoni');
  
  var scoreData = {
      heroTotal: 0,
      enemyTotal: 0,
      undecided: 0
  };
  
  //create Labels
  var scoreLabel = new lime.Label().setText("Your Shares: 0% \nPrivately Owned: 0% \nPublicly Owned: 0%").setFontFamily('Verdana').setFontColor('#0c0').setFontSize(20).setFontWeight('bold').setSize(250,30).setPosition(125,50);
  hudLayer.appendChild(scoreLabel);
  
  var comboLabel = new lime.Label().setText("").setFontFamily('Verdana').setFontColor('#00F').setFontSize(30).setFontWeight('bold').setSize(400,50).setPosition(700,50);
  hudLayer.appendChild(comboLabel);
  
  
  var finalStepFunction = function(){
    this.finished = true;
  }
  
  var levelTimer = new utilities.Timer(this.sliceTimerTick(levelData, levelSlices, scoreData, scoreLabel), finalStepFunction);
  this.endTimer = levelTimer.start();


  function initToppingsFunc(wedge, row, column) {
    return function() {

      var myCoordinates = utilities.ConvertCoordinates(wedge, row, column, triangleHeight);
      var newCircle = new lime.Circle().setSize(40, 40).setFill(0, 0, 0, 0).setPosition(myCoordinates.x, myCoordinates.y);
      toppingsLayer.appendChild(newCircle);

      levelData.add(wedge, row, column, {toppingType: 'empty', sprite: newCircle, isOccupied: false});

      //HANDLE mouse clicks
      goog.events.listen(newCircle, 'click', function(e) {

          var thisTopping = levelData.get(wedge, row, column);
          if (!thisTopping.isOccupied && levelData.wedgeAvailable[wedge] && mouseActive === true) {
            cursor.animate();
            //deactivate mouse
            mouseActive = false;
            lime.scheduleManager.callAfter(function() {
              mouseActive = true;
            },this, 1000);

            //place a PEPPERONI
            thisTopping.sprite.setFill(utilities.Topping('pepperoni').image); //.setFill(30*i,90*row,60*k);

            thisTopping.toppingType = 'pepperoni';
            thisTopping.isOccupied = true;
            var neighborList = levelData.neighbors(wedge, row, column);

            if (!!powerUps) {
              var powerUpProperties = Object.getOwnPropertyNames(powerUps);
              for (var i = powerUpProperties.length - 1; i >= 0; i--) {
                if (powerUps[powerUpProperties[i]] > 0) {
                  utilities.Topping(powerUpProperties[i]).powerUp(levelData, wedge, row, column, powerUps[powerUpProperties[i]], levelTimer);
                }
              }
            }

            //Check Neighbor Triggers
            var resultsObject = {mushroom: 0, olive: 0, anchovy: 0};
            for (var x = neighborList.length - 1; x >= 0; x--) {
              var neighborData = levelData.get(neighborList[x].wedge, neighborList[x].row, neighborList[x].column);
              if (neighborData.isOccupied) {
                utilities.Topping(neighborData.toppingType).chaining(levelData, neighborList[x].wedge, neighborList[x].row, neighborList[x].column, resultsObject); //wedge, row, column);
              }
            }
            powerUps = resultsObject;
            
            comboCounter(powerUps,levelData);
          }
      });
    };
  }

  for (var wedge = 7; wedge >= 0; wedge--) {
    for (var row = size - 1; row >= 0; row--) {
      for (var column = row * 2; column >= 0; column--) {

        (initToppingsFunc(wedge, row, column))();

      }
    }
  }

  randomizeLevel(size, triangleHeight, levelData, toppingsLayer, toppingChances);

  this.levelScene = newLevel;

};



utilities.Level.prototype.isFinished = function()
{
  return this.finished;
};

utilities.Level.prototype.setFinished = function(fin)
{
  this.finished = fin;
};



// Local Functions
function comboCounter(powerUps, levelData)
{
  var comboList = [];

  if(powerUps.mushroom >=4 && powerUps.mushroom<6){
    comboList.push("Double Stack ACTIVATED");
  }
  else if(powerUps.mushroom >=6){
    comboList.push("Triple Stack ACTIVATED");
  }
  
  if(powerUps.olive >=2){
    comboList.push("AOE ACTIVATED");
  }
  
  if(powerUps.anchovy >= 2){
    comboList.push("Time Slow ACTIVATED");
  }
  
  for(i=comboList.length-1;i>=0;i--)
  {
    console.log(comboList[i]);
  }
  
  return comboList;
}

//function sliceTimerTick(levelData, levelSlices, scoreData, scoreLabel,newLevelFunc) {
utilities.Level.prototype.sliceTimerTick = function(levelData, levelSlices, scoreData, scoreLabel) {
  var that = this;
  return function() {
    var removedSlice = levelData.removeSlice();
    levelSlices[removedSlice].setFill(0, 0, 0, 0);
    var inWedge = levelData.getInWedge(removedSlice);
    for (var i = inWedge.length - 1; i >= 0; i--) {
      inWedge[i].sprite.setFill(0, 0, 0, 0);
    };
    
    that.tallyScores(inWedge, scoreData, scoreLabel);
  };
}

//called when a wedge is REMOVED
//function tallyScores(inWedge, scoreData, scoreLabel,newLevelFunc)
utilities.Level.prototype.tallyScores = function(inWedge, scoreData, scoreLabel)
{
  for (var i = inWedge.length - 1; i >= 0; i--) {
    if(inWedge[i].toppingType === 'pepperoni' || inWedge[i].toppingType === 'doublePepperoni' || inWedge[i].toppingType === 'triplePepperoni')
      scoreData.heroTotal++;
    else if(inWedge[i].toppingType === 'empty')
      scoreData.undecided++;
    else
      scoreData.enemyTotal++;
  };
  
  var heroPercentage = Math.round(100*scoreData.heroTotal/128);
  var enemyPercentage = Math.round(100*scoreData.enemyTotal/128);
  var unclaimedPercentage = Math.round(100*scoreData.undecided/128);
  
  //console.log("Your Shares: " + heroPercentage + "%, Privately Owned: " + enemyPercentage + "%, Publicly Owned: " + unclaimedPercentage + "%");
  scoreLabel.setText("Your Shares: " + heroPercentage + "%, Privately Owned: " + enemyPercentage + "%, Publicly Owned: " + unclaimedPercentage + "%");
  
  if(heroPercentage > 10){
    this.endTimer();
    this.finished = true;
    console.log(this.finished);
  }
}


function randomizeLevel(size, triangleHeight, levelData, toppings, toppingChances) {

  var low = toppingChances.mushroom;
  var mid = low + toppingChances.olive;
  var high = mid + toppingChances.anchovy;

  var rand = 0;

  for (var wedge = 7; wedge >= 0; wedge--) {
    for (var row = size - 1; row >= 0; row--) {
      for (var column = row * 2; column >= 0; column--) {
        rand = Math.random();
        if (rand < low) {
          var myCoordinates = utilities.ConvertCoordinates(wedge, row, column, triangleHeight);
          levelData.get(wedge, row, column).sprite.setFill(utilities.Topping('mushroom').image);
          levelData.get(wedge, row, column).isOccupied = true;
          levelData.get(wedge, row, column).toppingType = 'mushroom';
        }
        else if (rand >= low && rand < mid) {
          var myCoordinates = utilities.ConvertCoordinates(wedge, row, column, triangleHeight);

          levelData.get(wedge, row, column).sprite.setFill(utilities.Topping('olive').image);
          levelData.get(wedge, row, column).isOccupied = true;
          levelData.get(wedge, row, column).toppingType = 'olive';
        }
        else if (rand >= mid && rand < high) {
          var myCoordinates = utilities.ConvertCoordinates(wedge, row, column, triangleHeight);

          levelData.get(wedge, row, column).sprite.setFill(utilities.Topping('anchovy').image);
          levelData.get(wedge, row, column).isOccupied = true;
          levelData.get(wedge, row, column).toppingType = 'anchovy';
        }
      }
    }
  }
}

goog.exportSymbol('utilities.Level', utilities.Level);
