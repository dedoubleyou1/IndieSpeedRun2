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

utilities.Level = function(size, triangleHeight, toppingChances) {
  var newLevel = new lime.Scene();
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
    newLevel.appendChild(levelSlices[i]);
  }

  var toppings = new lime.Layer().setPosition(512, 384);
  var levelData = new utilities.NewStruct(size);
  var powerUps = false;
  var mouseActive = true;
  //Level Timer
  var levelTimer = new utilities.Timer(sliceTimerTick(levelData, levelSlices), function(){} );


  function initToppingsFunc(wedge, row, column) {
    return function() {

      var myCoordinates = utilities.ConvertCoordinates(wedge, row, column, triangleHeight);
      var newCircle = new lime.Circle().setSize(40, 40).setFill(0, 0, 0, 0).setPosition(myCoordinates.x, myCoordinates.y);
      toppings.appendChild(newCircle);

      levelData.add(wedge, row, column, {toppingType: 'empty', sprite: newCircle, isOccupied: false});

      //HANDLE mouse clicks
      goog.events.listen(newCircle, 'click', function(e) {

          var thisTopping = levelData.get(wedge, row, column);
          console.log(mouseActive);
          if (!thisTopping.isOccupied && levelData.wedgeAvailable[wedge] && mouseActive === true) {
            //deactivate mouse
            mouseActive = false;
            lime.scheduleManager.callAfter(function() {
              mouseActive = true;
            },this, 1000);

            //place a PEPPERONI
            newCircle.setFill(utilities.Topping('pepperoni').image); //.setFill(30*i,90*row,60*k);
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

  randomizeLevel(size, triangleHeight, levelData, toppings, toppingChances);

  newLevel.appendChild(toppings);
  this.levelScene = newLevel;

  levelTimer.start();
};


// Local Functions

function sliceTimerTick(levelData, levelSlices) {
  return function() {
    var removedSlice = levelData.removeSlice();
    levelSlices[removedSlice].setFill(0, 0, 0, 0);
    var inWedge = levelData.getInWedge(removedSlice);
    for (var i = inWedge.length - 1; i >= 0; i--) {
      inWedge[i].sprite.setFill(0, 0, 0, 0);
    };
  };
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
