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
};

goog.exportSymbol('utilities.Topping',utilities.Topping);