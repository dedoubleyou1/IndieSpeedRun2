goog.provide('utilities.Topping');

var toppingTypes = {
  pepperoni: {
    image: 'assets/toppings_pepperoni.png'
  },
  mushroom: {
    image: 'assets/toppings_mushroom.png'
  },
  olive: {
    image: 'assets/toppings_olive.png'
  },
  anchovy: {
    image: 'assets/toppings_anchovy.png'
  }
  // bacon: 4,
  // buffaloChicken: 5,

};

utilities.Topping = function(type)
{
    return toppingTypes[type];
// //    var image = new lime.Sprite();
//     var image = new lime.Circle().setSize(40,40).setFill('#FFFFFF').
    
//     //resistance = how much enemy dominance this topping can withstand
//     var resistance = 1;
//     var dominance = 0; 
    
//     //whether or not this topping is being dominated by a pepperoni
//     TYPE = type;
    
//     /* 
//         influential: 1,
//         dominant: 2,
//         infludominant: 3,
//         bomb: 4
//     */ 
};

//returns type
utilities.Topping.prototype.getType = function()
{
    return this.TYPE;
}

//
utilities.Topping.prototype.addDominance = function(domToAdd)
{
    dominance += domToAdd;
    
    if(dominance >= resistance)
    {
        turn 
        TYPE = 1;
    }
}

goog.exportSymbol('utilities.Topping',utilities.Topping);