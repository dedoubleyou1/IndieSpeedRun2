goog.provide('utilities.Level');


//get requirements
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Sprite');
goog.require('utilities.NewStruct');
goog.require('utilities.ConvertCoordinates');

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

      levelData.add(i, j, k, {junk: "data"});
      var myCoordinates = utilities.ConvertCoordinates(i, j, k, triangleHeight);
      var newCircle = new lime.Circle().setSize(38,38).setFill(0,0,0,0).setPosition(20 * myCoordinates.x, 20 * myCoordinates.y);
      toppings.appendChild(newCircle);

      goog.events.listen(newCircle,'click', function(e){
          newCircle.setFill(30*i,90*j,60*k)
          console.log(i, j, k);
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

  newLevel.appendChild(toppings);
  this.levelScene = newLevel;
}

goog.exportSymbol('utilities.Level', utilities.Level);