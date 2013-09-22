goog.provide('utilities.ConvertCoordinates');

goog.require('goog.math.Vec2');

 
//Given pizza coordinates, return screen coordinates
utilities.ConvertCoordinates = function(wedge,row,column)
{
    //use WEDGE to get the starting angle
    var startAngle = wedge * (Math.PI/4);
    
    //use ROW to figure out the "radius" of that row
    var triangleHeight = 5;
    var rowRadius = triangleHeight/2 + row*(triangleHeight/2);
    
    //get the two SIDE vectors of this particular wedge @ rowRadius
    var sideVector1 = new goog.math.Vec2(rowRadius,0).rotate(startAngle);
    var sideVector2 = new goog.math.Vec2(rowRadius,0).rotate(startAngle + Math.PI/4);
    
    //get the center line of this 
    var centerEdge = goog.math.Vec2.difference(sideVector2,sideVector1);
    
    //use ROW to figure out how to break up this vector into mini segments
    var numberOfSegments = (row*2+1)*2;
    var ratioOfSegment = 1/numberOfSegments;
    
    //use COLUMN to figure out how to scale the vector
//    centerEdge.scale((column+1) * 1/numberOfSegments);
    centerEdge.scale(ratioOfSegment + column*2*ratioOfSegment);

    
    var triangleCenter = goog.math.Vec2.sum(sideVector1,centerEdge);
    
    var offset = triangleHeight/16;
    
    //find OFFSET vector based on odd or even?
    if(column%2 == 0){
        triangleCenter.add(triangleCenter.clone().normalize().scale(offset));
    }else{
        triangleCenter.add(triangleCenter.clone().normalize().scale(-offset));
        triangleCenter.add(triangleCenter.clone().normalize().scale(offset));
    }
    
    return triangleCenter;
};

goog.exportSymbol('utilities.ConvertCoordinates',utilities.ConvertCoordinates);
