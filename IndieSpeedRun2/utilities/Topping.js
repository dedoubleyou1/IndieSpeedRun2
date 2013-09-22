goog.provide('utilities.Topping');

var toppingTypes = {
  pepperoni: {
    image: 'assets/toppings_pepperoni.png',
    chaining: function(levelData, i, j, k){
      
    }
    
  },
  
  mushroom: {
    image: 'assets/toppings_mushroom.png',
    chaining: function(levelData, i, j, k){
        this.toppingType = 'pepperoni';
        this.sprite.setFill(utilities.Topping('pepperoni').image);
      
        attackNeighbors(levelData, i, j, k);
    }
  },
  
  olive: {
    image: 'assets/toppings_olive.png',
    chaining: function(levelData, i, j, k){
      
    }
  },
  
  anchovy: {
    image: 'assets/toppings_anchovy.png',
    chaining: function(levelData, i, j, k){
      
    }
  }
  
  // bacon: 4,
  // buffaloChicken: 5,

};

utilities.Topping = function(type)
{
    return toppingTypes[type];
};

//dat local neighbor check
function attackNeighbors(levelData, i,j,k)
{
  var neighborList = levelData.neighbors(i,j,k);
                
  for(i=0; i<neighborList.length; i++){
    //console.log(neighborList);
    var target= levelData.get(neighborList[i].wedge, neighborList[i].row, neighborList[i].column);
    
    if(target.isOccupied)
      target.chaining(levelData,i,j,k);
  }
}


goog.exportSymbol('utilities.Topping',utilities.Topping);


/*
var attackNeighbors = function(i,j,k)
            {
                var neighborList = levelData.neighbors(i,j,k);
                
                for(i=0; i<neighborList.length; i++){
                  console.log(neighborList);
                  var target= levelData.get(neighborList[i].wedge, neighborList[i].row, neighborList[i].column);
                  
                  if(!target.isOccupied)
                    return;
                  
                  if(target.toppingType == 'mushroom'){
                    target.toppingType = 'pepperoni';
                    target.sprite.setFill(utilities.Topping('pepperoni').image);
                    attackNeighbors(neighborList[i].wedge, neighborList[i].row, neighborList[i].column);
                  }
                }
            }
            
attackNeighbors(i,j,k);

*/