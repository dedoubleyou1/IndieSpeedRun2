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
      for (var k = j * 2 - 1; k >= 0; k--) {
        levelData.add(i, j, k, {junk: "data"});
        var myCoordinates = utilities.ConvertCoordinates(i, j, k);
        var newCircle = new lime.Circle().setSize(20,20).setFill(255,150,0).setPosition(myCoordinates.x, myCoordinates.y);
        toppings.appendChild(newCircle);
        console.log(myCoordinates);
      }
    }
  }

  newLevel.appendChild(toppings);
  this.levelScene = newLevel;
}

goog.exportSymbol('utilities.Level', utilities.Level);