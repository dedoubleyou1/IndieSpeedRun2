goog.provide('utilities.Cursor');

goog.require('lime.Sprite');

utilities.Cursor = function(director, cursorType) {
  goog.events.listen(director, goog.events.EventType.ONMOUSEMOVE, function (e) {
    console.log('hi');
  })
}
utilities.Cursor.prototype.changeSprite = function() {

}

goog.exportSymbol('utilities.Cursor', utilities.Cursor);
