goog.provide('utilities.Topping');

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
        levelData.get(wedge, row, column).toppingType = 'pepperoni';
        levelData.get(wedge, row, column).sprite.setFill(toppingData.pepperoni.image);
        resultsObject.mushroom++;
        attackNeighbors(levelData, wedge, row, column, resultsObject);
    },
    powerUp: function(levelData, wedge, row, column, strength){
      if(strength >= 4){
        
        return true;
      }
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
      }

      if(pprCount >= 2){
        //turn into a pepperoni and ATTACK!!
        levelData.get(wedge, row, column).toppingType = 'pepperoni';
        levelData.get(wedge, row, column).sprite.setFill(toppingData.pepperoni.image);
        resultsObject.olive++;
        return attackNeighbors(levelData, wedge, row, column, resultsObject);
      }
    },
    
    powerUp: function(levelData, wedge, row, column, strength){
      if(strength >= 2){
        
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
          pprCount++;
      }
      
      if(pprCount == 3){
        //turn into a pepperoni and ATTACK!!
        levelData.get(wedge, row, column).toppingType = 'pepperoni';
        levelData.get(wedge, row, column).sprite.setFill(toppingData.pepperoni.image);
        resultsObject.anchovy++;
        return attackNeighbors(levelData, wedge, row, column, resultsObject);
      }
    },
    powerUp: function(levelData, wedge, row, column, strength){
      if(strength >= 1){
        
        return true;
      }
      return false;
    }
  }
  
  // bacon: 4,
  // buffaloChicken: 5,

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