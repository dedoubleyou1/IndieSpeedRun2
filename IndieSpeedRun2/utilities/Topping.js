goog.provide('utilities.Topping');

var toppingData = {
  pepperoni: {
    image: 'assets/toppings_pepperoni.png',
    chaining: function(levelData, wedge, row, column){
      
    }
    
  },
  
  mushroom: {
    image: 'assets/toppings_mushroom.png',
    chaining: function(levelData, wedge, row, column){
        levelData.get(wedge, row, column).toppingType = 'pepperoni';
        levelData.get(wedge, row, column).sprite.setFill(toppingData.pepperoni.image);      
        attackNeighbors(levelData, wedge, row, column);
    }
  },
  
  olive: {
    image: 'assets/toppings_olive.png',
    chaining: function(levelData, wedge, row, column){
      
    }
  },
  
  anchovy: {
    image: 'assets/toppings_anchovy.png',
    chaining: function(levelData, wedge, row, column){
      
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
function attackNeighbors(levelData, wedge,row,column)
{
  var neighborList = levelData.neighbors(wedge,row,column);

  console.log(neighborList);
                
  for(i=0; i<neighborList.length; i++){
    console.log('yo');
    var target = levelData.get(neighborList[i].wedge, neighborList[i].row, neighborList[i].column);
    
    if(target.isOccupied && target.toppingType === 'mushroom')
      toppingData[target.toppingType].chaining(levelData,neighborList[i].wedge, neighborList[i].row, neighborList[i].column);
  }
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