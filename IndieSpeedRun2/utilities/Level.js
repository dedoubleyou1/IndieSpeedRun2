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
  
  
  for (var i = 7; i >= 0; i--) {
    for (var j = size - 1; j >= 0; j--) {
      for (var k = j * 2; k >= 0; k--) {
        levelData.add(i, j, k, {junk: "data"});
        var myCoordinates = utilities.ConvertCoordinates(i, j, k, triangleHeight);
        var newCircle = new lime.Circle().setSize(38,38).setFill(i * 30, j * 90, k * 60).setPosition(20 * myCoordinates.x, 20 * myCoordinates.y);
                

        goog.events.listen(newCircle,'click', function(e){
            console.log(tempholder().i, tempholder().j, tempholder().k);
        })
        
        
        toppings.appendChild(newCircle);
        console.log(i, j, k, myCoordinates);
      }
    }
  }
  
  

  newLevel.appendChild(toppings);
  this.levelScene = newLevel;
}

goog.exportSymbol('utilities.Level', utilities.Level);