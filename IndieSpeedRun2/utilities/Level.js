goog.provide('utilities.Level');


//get requirements
goog.require('lime.Circle');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('utilities.ConvertCoordinates');
goog.require('utilities.NewStruct');
goog.require('utilities.Topping');

utilities.Level = function(size, triangleHeight) {

  var newLevel = new lime.Scene();
  var levelBackground = new lime.Sprite()
    .setFill('assets/pizza_large.png')
    .setPosition(512, 384);
  newLevel.appendChild(levelBackground);
  var toppings = new lime.Layer().setPosition(512, 384);
  var levelData = new utilities.NewStruct(size);
  var powerUps = false;

  function initToppingsFunc(wedge, row, column) {
    return function() {

      var myCoordinates = utilities.ConvertCoordinates(wedge, row, column, triangleHeight);
      var newCircle = new lime.Circle().setSize(40, 40).setFill(0, 0, 0, 0).setPosition(myCoordinates.x, myCoordinates.y);
      toppings.appendChild(newCircle);

      levelData.add(wedge, row, column, {toppingType: 'empty', sprite: newCircle, isOccupied: false});

      //HANDLE mouse clicks
      goog.events.listen(newCircle, 'click', function(e) {

          var thisTopping = levelData.get(wedge, row, column);

          if (!thisTopping.isOccupied) {
            //place a PEPPERONI
            newCircle.setFill(utilities.Topping('pepperoni').image); //.setFill(30*i,90*row,60*k);
            var thisTopping = levelData.get(wedge, row, column);
            thisTopping.toppingType = 'pepperoni';
            thisTopping.isOccupied = true;
            var neighborList = levelData.neighbors(wedge, row, column);

            console.log(powerUps);
            if (!!powerUps) {
              var powerUpProperties = Object.getOwnPropertyNames(powerUps);
              for (var i = powerUpProperties.length - 1; i >= 0; i--) {
                if (powerUps[powerUpProperties[i]] > 0) {
                  utilities.Topping(powerUpProperties[i]).powerUp(levelData, wedge, row, column)
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

  randomizeLevel(size, triangleHeight, levelData, toppings);

  newLevel.appendChild(toppings);
  this.levelScene = newLevel;
};

function randomizeLevel(size, triangleHeight, levelData, toppings) {
  var rand = 0;

  for (var wedge = 7; wedge >= 0; wedge--) {
    for (var row = size - 1; row >= 0; row--) {
      for (var column = row * 2; column >= 0; column--) {
        rand = Math.random();
        if (rand < .2) {
          var myCoordinates = utilities.ConvertCoordinates(wedge, row, column, triangleHeight);
          levelData.get(wedge, row, column).sprite.setFill(utilities.Topping('mushroom').image);
          levelData.get(wedge, row, column).isOccupied = true;
          levelData.get(wedge, row, column).toppingType = 'mushroom';
        }
        else if (rand >= 0.2 && rand < 0.3) {
          var myCoordinates = utilities.ConvertCoordinates(wedge, row, column, triangleHeight);

          levelData.get(wedge, row, column).sprite.setFill(utilities.Topping('olive').image);
          levelData.get(wedge, row, column).isOccupied = true;
          levelData.get(wedge, row, column).toppingType = 'olive';
        }
        else if (rand >= 0.5 && rand < 0.55) {
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
