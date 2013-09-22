goog.provide('utilities.Level');


//get requirements
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('utilities.NewStruct');
goog.require('utilities.ConvertCoordinates');

utilities.Level = function(size) {
  var newLevel = new lime.Scene();
  var toppings = new lime.Layer().setPosition(512,384);
  var levelData = new utilities.NewStruct(size);
  for (var i = 7; i >= 0; i--) {
    for (var j = size - 1; j >= 0; j--) {
      for (var k = j * 2; k >= 0; k--) {
        levelData.add(i, j, k, {junk: "data"});
        var myCoordinates = utilities.ConvertCoordinates(i, j, k);
        var newCircle = new lime.Circle().setSize(15,15).setFill(i*20,j*10,k*5).setPosition(20 * myCoordinates.x, 20 * myCoordinates.y);
        toppings.appendChild(newCircle);
        console.log(i, j, k, myCoordinates);
      }
    }
  }

  newLevel.appendChild(toppings);
  this.levelScene = newLevel;
}

goog.exportSymbol('utilities.Level', utilities.Level);