goog.provide('utilities.Level');


//get requirements
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Sprite');
goog.require('utilities.NewStruct');
goog.require('utilities.ConvertCoordinates');
goog.require('utilities.Topping');

utilities.Level = function(size, triangleHeight) {

  var newLevel = new lime.Scene();
  var levelBackground = new lime.Sprite()
    .setFill('assets/pizza_large.png')
    .setPosition(512, 384);
  newLevel.appendChild(levelBackground);
  var toppings = new lime.Layer().setPosition(512, 384);
  var levelData = new utilities.NewStruct(size);
<<<<<<< HEAD
=======
  var powerUps = {};
>>>>>>> 267a0c2465feabce947a12cff8674db060b0849d
  
  function initToppingsFunc(wedge, row, column) {   
    return function() {

      var myCoordinates = utilities.ConvertCoordinates(wedge, row, column, triangleHeight);
      var newCircle = new lime.Circle().setSize(40,40).setFill(0,0,0,0).setPosition(myCoordinates.x, myCoordinates.y);
      toppings.appendChild(newCircle);

      levelData.add(wedge, row, column, {toppingType: 'empty', sprite: newCircle, isOccupied: false});

      //HANDLE mouse clicks
      goog.events.listen(newCircle,'click', function(e){
          
          var thisTopping = levelData.get(wedge, row, column);

          if(!thisTopping.isOccupied){
            //place a PEPPERONI
            newCircle.setFill(utilities.Topping('pepperoni').image); //.setFill(30*i,90*row,60*k);
            var thisTopping = levelData.get(wedge, row, column);
            thisTopping.toppingType = 'pepperoni';
            thisTopping.isOccupied = true;
            var neighborList = levelData.neighbors(wedge, row, column);

            var powerUpProperties = Object.getOwnPropertyNames(powerUps);
            for (var i = powerUpProperties.length - 1; i >= 0; i--) {
              powerUps[powerUpProperties[i]]
            };
            
            //Check Neighbor Triggers
            resultsArray = [];
            var resultsObject = {};
            for (var x = neighborList.length - 1; x >= 0; x--) {
              var neighborData = levelData.get(neighborList[x].wedge, neighborList[x].row, neighborList[x].column);
              if (neighborData.isOccupied) {
                var temp = utilities.Topping(neighborData.toppingType).chaining(levelData,neighborList[x].wedge, neighborList[x].row, neighborList[x].column, resultsObject); //wedge, row, column);
                resultsArray.push(temp);
              }
            }

            //Tally up results from placement
            finalTally = {};
            for (var i = resultsArray.length - 1; i >= 0; i--) {
              var propertyNames = Object.getOwnPropertyNames(resultsArray[i])
              for (var j = propertyNames.length - 1; j >= 0; j--) {
                if (finalTally.hasOwnProperty(propertyNames[j])) {
                  finalTally[propertyNames[j]] += resultsArray[i][propertyNames[j]];
                } else {
                  finalTally[propertyNames[j]] = resultsArray[i][propertyNames[j]];
                }
              }
            }
            powerUps= = finalTally;
          }
      })
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
}

function randomizeLevel(size, triangleHeight, levelData, toppings) {
  var rand = 0;

  for (var wedge = 7; wedge >= 0; wedge--) {
    for (var row = size - 1; row >= 0; row--) {
      for (var column = row * 2; column >= 0; column--) {
        rand = Math.random();
        if(rand < .2){
          var myCoordinates = utilities.ConvertCoordinates(wedge, row, column, triangleHeight);
          levelData.get(wedge, row, column).sprite.setFill(utilities.Topping('mushroom').image);
          levelData.get(wedge, row, column).isOccupied = true;
          levelData.get(wedge, row, column).toppingType = 'mushroom';
        }
        else if(rand >= .2 && rand < .3){
          var myCoordinates = utilities.ConvertCoordinates(wedge, row, column, triangleHeight);
          
          levelData.get(wedge, row, column).sprite.setFill(utilities.Topping('olive').image);
          levelData.get(wedge, row, column).isOccupied = true;
          levelData.get(wedge, row, column).toppingType = 'olive';
        }
        else if(rand >= .5 && rand < .55){
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