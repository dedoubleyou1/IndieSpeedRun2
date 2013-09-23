goog.provide('utilities.Topping');

goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Spawn');

var pop = new lime.animation.Spawn(
    new lime.animation.Sequence(
      new lime.animation.ScaleTo(0).setDuration(0),
      new lime.animation.ScaleTo(1).setDuration(.1)
    ),
    new lime.animation.Sequence(
      new lime.animation.FadeTo(0).setDuration(0),
      new lime.animation.FadeTo(1).setDuration(.1)
    )
);

var toppingData = {
  //PEPPERONI//
  pepperoni: {
    image: 'assets/toppings_pepperoni.png',
    chaining: function(levelData, wedge, row, column,resultsObject){
      //nothing happens here!
    },
    powerUp: function(levelData, wedge, row, column, strength){
      //nuttin here either
    }
  },
  
  //MUSHROOM//
  mushroom: {
    image: 'assets/toppings_mushroom.png',
    chaining: function(levelData, wedge, row, column, resultsObject){
        //turn into a pepperoni and ATTACK!!
        var thisObject = levelData.get(wedge, row, column);
        thisObject.toppingType = 'pepperoni';
        thisObject.sprite.setFill(toppingData.pepperoni.image);
        thisObject.sprite.runAction(pop);

        resultsObject.mushroom++;
        goog.events.listen(pop, lime.animation.Event.STOP, function(){
          pop.removeTarget(thisObject.sprite);
          attackNeighbors(levelData, wedge, row, column, resultsObject);
        });
    },
    
    //STACKING power-up
    powerUp: function(levelData, wedge, row, column, strength){
      if(strength >= 4){
        
        if(strength <6) {
          levelData.get(wedge, row, column).toppingType = 'doublePepperoni';
          levelData.get(wedge, row, column).sprite.setFill(toppingData.doublePepperoni.image);
        }
        else if (strength >=6) {
          levelData.get(wedge, row, column).toppingType = 'triplePepperoni';
          levelData.get(wedge, row, column).sprite.setFill(toppingData.triplePepperoni.image);
        }
        console.log(levelData.get(wedge, row, column).toppingType);
        return true;
      }
      
      levelData.get(wedge,row,column).toppingType.stack = 1;
      return false;
    }
  },
  
  //OLIVES//
  olive: {
    image: 'assets/toppings_olive.png',
    chaining: function(levelData, wedge, row, column, resultsObject){
      var neighborTypes = checkNeighbors(levelData,wedge,row,column);
      var pprCount = 0;
      
      for (var i = neighborTypes.length - 1; i >= 0; i--) {
        if(neighborTypes[i] == 'pepperoni')
          pprCount++;
        else if(neighborTypes[i] == 'doublePepperoni' || neighborTypes[i] == 'triplePepperoni'){
          pprCount +=2; //don't need 3 anywho
        }
      }

      if(pprCount >= 2){
        //turn into a pepperoni and ATTACK!!
        levelData.get(wedge, row, column).toppingType = 'pepperoni';
        levelData.get(wedge, row, column).sprite.setFill(toppingData.pepperoni.image);
        resultsObject.olive++;
        return attackNeighbors(levelData, wedge, row, column, resultsObject);
      }
    },
    
    //AOE power-up
    powerUp: function(levelData, wedge, row, column, strength){
      if(strength >= 2){
        var neighborList = levelData.neighbors(wedge,row,column);
        console.log('AOE ENABLED');
        
        for (var i = neighborList.length - 1; i >= 0; i--) {
          var neighborData = levelData.get(neighborList[i].wedge, neighborList[i].row, neighborList[i].column);
          
          if(!neighborData.isOccupied){
            neighborData.toppingType = 'littlePepperoni';
            neighborData.sprite.setFill(utilities.Topping('pepperoni').image)
            neighborData.isOccupied = true;
          }
        }
        return true;
      }
      return false;
    }
  },
  
  //ANCHOVY//
  anchovy: {
    image: 'assets/toppings_anchovy.png',
    chaining: function(levelData, wedge, row, column, resultsObject){
      var neighborTypes = checkNeighbors(levelData,wedge,row,column);
      var pprCount = 0;
      
      for (var i = neighborTypes.length - 1; i >= 0; i--) {
        if(neighborTypes[i] == 'pepperoni')
          pprCount ++;
        else if(neighborTypes[i] == 'doublePepperoni')
          pprCount +=2; //don't need 3 anywho
        else if(neighborTypes[i] == 'triplePepperoni')
          pprCount +=3;
      }
      
      if(pprCount >= 3){
        //turn into a pepperoni and ATTACK!!
        levelData.get(wedge, row, column).toppingType = 'pepperoni';
        levelData.get(wedge, row, column).sprite.setFill(toppingData.pepperoni.image);
        resultsObject.anchovy++;
        return attackNeighbors(levelData, wedge, row, column, resultsObject);
      }
    },
    
    //SLOW TIME
    powerUp: function(levelData, wedge, row, column, strength, levelTimer){
      if(strength >= 2){
        var bonus = (strength-1)*5000;
        console.log(bonus);
        levelTimer.addTime(bonus);
        return true;
      }  
      return false;
    }
  },
  
  // bacon: 4,
  // buffaloChicken: 5,
  
  doublePepperoni: {
    image: 'assets/toppings_pepperoni_double.png',
    chaining: function(levelData, wedge, row, column,resultsObject){
      //nothing happens here!
    },
    powerUp: function(levelData, wedge, row, column, strength){
      //nuttin here either
    }
  },
  
  triplePepperoni: {
    image: 'assets/toppings_pepperoni_triple.png',
    chaining: function(levelData, wedge, row, column,resultsObject){
      //nothing happens here!
    },
    powerUp: function(levelData, wedge, row, column, strength){
      //nuttin here either
    }
  },
  
  littlePepperoni: {
    image: 'assets/toppings_pepperoni.png',
    chaining: function(levelData, wedge, row, column,resultsObject){
      //turn into a pepperoni and ATTACK!!
      levelData.get(wedge, row, column).toppingType = 'pepperoni';
      levelData.get(wedge, row, column).sprite.setFill(toppingData.pepperoni.image);
      resultsObject.mushroom++;
      attackNeighbors(levelData, wedge, row, column, resultsObject);
    },
    powerUp: function(levelData, wedge, row, column, strength){
      //nuttin here either
    }
  }

};

utilities.Topping = function(type)
{
    return toppingData[type];
};

//dat local neighbor check
function attackNeighbors(levelData, wedge,row,column, resultsObject)
{
  //TALLYING
  levelData.get(wedge,row,column).toppingType;

  var neighborList = levelData.neighbors(wedge,row,column);
  
  for (var i = neighborList.length - 1; i >= 0; i--) {
    var target = levelData.get(neighborList[i].wedge, neighborList[i].row, neighborList[i].column);
    
    if(target.isOccupied && target.toppingType != 'pepperoni')
      toppingData[target.toppingType].chaining(levelData,neighborList[i].wedge, neighborList[i].row, neighborList[i].column, resultsObject);
  }
}


function checkNeighbors(levelData, wedge,row,column)
{
  var neighborList = levelData.neighbors(wedge,row,column);
  var neighborTypes = [];
  
  for (var i = neighborList.length - 1; i >= 0; i--) {
    var target = levelData.get(neighborList[i].wedge, neighborList[i].row, neighborList[i].column);
    
    if(target.isOccupied)
      neighborTypes.push(target.toppingType);
  }
  
  return neighborTypes;
}


goog.exportSymbol('utilities.Topping',utilities.Topping);


/*
var attackNeighbors = function(wedge,row,column)
            {
                var neighborList = levelData.neighbors(wedge,row,column);
                
                for(i=0; i<neighborList.length; i++){
                  console.log(neighborList);
                  var target= levelData.get(neighborList[i].wedge,, neighborList[i].row, neighborList[i].column);
                  
                  if(!target.isOccupied)
                    return;
                  
                  if(target.toppingType == 'mushroom'){
                    target.toppingType = 'pepperoni';
                    target.sprite.setFill(utilities.Topping('pepperoni').image);
                    attackNeighbors(neighborList[i].wedge,, neighborList[i].row, neighborList[i].column);
                  }
                }
            }
            
attackNeighbors(wedge,row,column);
*/