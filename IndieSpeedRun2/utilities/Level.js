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
  
  function initToppingsFunc(i, j, k) {   
    return function() {


      var myCoordinates = utilities.ConvertCoordinates(i, j, k, triangleHeight);
      var newCircle = new lime.Circle().setSize(40,40).setFill(0,0,0,0).setPosition(myCoordinates.x, myCoordinates.y);
      toppings.appendChild(newCircle);

      levelData.add(i, j, k, {toppingType: 'empty', sprite: newCircle, isOccupied: false});

      //HANDLE mouse clicks
      goog.events.listen(newCircle,'click', function(e){
          if(!levelData.get(i,j,k).isOccupied){
            //place a PEPPERONI
            newCircle.setFill(utilities.Topping('pepperoni').image); //.setFill(30*i,90*j,60*k);
            var thisTopping = levelData.get(i,j,k);
            thisTopping.toppingType = 'pepperoni';
            thisTopping.isOccupied = true;
            var neighborList = levelData.neighbors(i, j, k);
            
            for (var i = neighborList.length - 1; i >= 0; i--) {
              if neighborList[i].isOccupied
              utilities.Topping(neighborList[i].toppingType).chaining(levelData, i, j, k);
            };
            
          }
      })
    };
  }

  for (var i = 7; i >= 0; i--) {
    for (var j = size - 1; j >= 0; j--) {
      for (var k = j * 2; k >= 0; k--) {

        (initToppingsFunc(i, j, k))();

      }
    }
  }
  
  randomizeLevel(size, triangleHeight, levelData, toppings);

  newLevel.appendChild(toppings);
  this.levelScene = newLevel;
}

function randomizeLevel(size, triangleHeight, levelData, toppings) {
  var rand = 0;

  for (var i = 7; i >= 0; i--) {
    for (var j = size- 1; j >= 0; j--) {
      for (var k = j * 2; k >= 0; k--) {
        rand = Math.random();
        if(rand < .4){
          var myCoordinates = utilities.ConvertCoordinates(i, j, k, triangleHeight);
          
          levelData.get(i,j,k).sprite.setFill(utilities.Topping('mushroom').image);
          levelData.get(i,j,k).isOccupied = true;
          levelData.get(i,j,k).type = 'mushroom';
        }
        else if(rand >= .4 && rand < .6){
          var myCoordinates = utilities.ConvertCoordinates(i, j, k, triangleHeight);
          
          levelData.get(i,j,k).sprite.setFill(utilities.Topping('olive').image);
          levelData.get(i,j,k).isOccupied = true;
          levelData.get(i,j,k).type = 'olive';
        }
      }
    }
  }
  
}

goog.exportSymbol('utilities.Level', utilities.Level);