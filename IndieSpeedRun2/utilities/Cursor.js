goog.provide('utilities.Cursor');

goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Spawn');
goog.require('lime.Sprite');

cursorSettings = {
  pepperoni: {
    image: 'assets/toppings_pepperoni.png',
    animation: function(cursor) {
      var pop = new lime.animation.Spawn(
        new lime.animation.Sequence(
          new lime.animation.ScaleTo(0).setDuration(0),
          new lime.animation.ScaleTo(1).setDuration(1)
        ),
        new lime.animation.Sequence(
          new lime.animation.FadeTo(0).setDuration(0),
          new lime.animation.FadeTo(1).setDuration(1)
        )
      )
      // var fadeAnimate = new lime.animation.FadeTo(1).setDuration(1);
      // var scaleAnimate = new lime.animation.FadeTo(1).setDuration(1);
      cursor.runAction(pop);
    }
  }
};

utilities.Cursor = function(director, cursorLayer, cursorType) {
  this.cursorType = cursorType;
  this.cursorSprite = new lime.Sprite().setSize(40, 40).setFill(cursorSettings[cursorType].image);
  cursorLayer.appendChild(this.cursorSprite);
  var that = this;
  goog.events.listen(director, 'mousemove', function(e) {
    console.log(e);
    that.cursorSprite.setPosition(e.position.x, e.position.y);
  });
};
utilities.Cursor.prototype.changeSprite = function() {

};

utilities.Cursor.prototype.animate = function() {
  cursorSettings[this.cursorType].animation(this.cursorSprite);

};

goog.exportSymbol('utilities.Cursor', utilities.Cursor);
