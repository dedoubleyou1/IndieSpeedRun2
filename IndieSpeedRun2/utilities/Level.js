goog.provide('utilities.NewStruct');



utilities.NewStruct = function(size) {
  this.struct = [];
  for (var i = 7; i >= 0; i--) {
    var rows = [];
    for (var j = size - 1; j >= 0; j--) {
      var columns = [];
      for (var k = j * 2 - 1; k >= 0; k--) {
        columns.push({});
      }
      rows.push(columns);
    }
    this.struct.push(rows);
  }
  this.size = size;
  this.removedWedges = [];
  this.wedgeAvailable = [];
  for (var i = 7; i >= 0; i--) {
        this.wedgeAvailable.push(true);
  }
};

utilities.NewStruct.prototype.add = function(wedge, row, column, data) {
  this.struct[wedge][row][column] = data;
};

utilities.NewStruct.prototype.get = function(wedge, row, column) {
  return this.struct[wedge][row][column];
};

utilities.NewStruct.prototype.getInWedge = function(wedge) {
  var wedgeMembers = [];
    for (var row = this.size - 1; row >= 0; row--) {
      for (var column = row * 2; column >= 0; column--) {
        wedgeMembers.push(this.struct[wedge][row][column]);
      }
    }
  return wedgeMembers;
};

utilities.NewStruct.prototype.removeSlice = function() {
  var removedWedge;
  if (this.removedWedges.length === 0) {
    removedWedge = Math.floor((Math.random() * 8));
    this.wedgeAvailable[removedWedge] = false;
    this.removedWedges.push(removedWedge);
  } else if (this.removedWedges.length === 1) {
    var removedWedge = Math.floor((Math.random() * 2));
    var nextRemovedWedge = this.removedWedges[0];
    if (removedWedge === 0) {

      nextRemovedWedge -= 1;
      if (nextRemovedWedge < 0) {
        nextRemovedWedge = 7;
      }
    } else {
      nextRemovedWedge += 1;
      if (nextRemovedWedge > 7) {
        nextRemovedWedge = 0;
      }
    }
    this.wedgeAvailable[nextRemovedWedge] = false;
    this.removedWedges.push(nextRemovedWedge);
    this.removedWedges.sort(function(a,b) {
      return a - b;
    });
    if (this.removedWedges[0] === 0 && this.removedWedges[1] === 7){
      this.removedWedges[0] = 7;
      this.removedWedges[1] = 0;
    }
    removedWedge = nextRemovedWedge;
  } else {
    var removedWedge = Math.floor((Math.random() * 2));
    if (removedWedge === 0) {
      this.removedWedges[0] -= 1;
      if (this.removedWedges[0] < 0) {
        this.removedWedges[0] = 7;
      }
      this.wedgeAvailable[this.removedWedges[0]] = false;
      removedWedge = this.removedWedges[0];
    } else {
      this.removedWedges[1] += 1;
      if (this.removedWedges[1] > 7) {
        this.removedWedges[1] = 0;
      }
      this.wedgeAvailable[this.removedWedges[1]] = false;
      removedWedge = this.removedWedges[1];
    }
  }
  return removedWedge;
};

utilities.NewStruct.prototype.neighbors = function(wedge, row, column) {
  neighborList = [];

  var wedgeCCW;
  var wedgeCW;
  
  var columnCCW;
  var columnCW;
  
  //var rowDir;
  columnCCW = column - 1;
  columnCW = column + 1;
  wedgeCCW = wedge;
  wedgeCW = wedge;
  
  if (column === 0) {
    columnCCW = row * 2;
    if (wedge === 0) {
      wedgeCCW = 7;
    } else {
      wedgeCCW = wedge - 1;
    }
  }
  
  if (column === row * 2) {
    columnCW = 0;
    if (wedge === 7) {
      wedgeCW = 0;
    } else {
      wedgeCW = wedge + 1;
    }
  }

  //IF wedge is available = push the data
  if (this.wedgeAvailable[wedgeCW]) {
    neighborList.push({
      wedge: wedgeCW,
      column: columnCW,
      row: row
    });
  }

  if (this.wedgeAvailable[wedgeCCW]) {
    neighborList.push({
      wedge: wedgeCCW,
      column: columnCCW,
      row: row
    });
  }
  
  //
  if (column % 2 !== 0) {
    neighborList.push({
      wedge: wedge,
      column: column-1,
      row: row - 1
    });
  } else if (row < this.size - 1) {
    neighborList.push({
      wedge: wedge,
      column: column+1,
      row: row + 1
    });
  }
  
  
  return neighborList;
};

goog.exportSymbol('utilities.NewStruct', utilities.NewStruct);

