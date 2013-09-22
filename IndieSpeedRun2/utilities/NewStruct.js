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

utilities.NewStruct.prototype.neighbors = function(wedge, row, column) {
  neighborList = [];

  var wedgeCCW;
  var wedgeCW;
  var columnCCW;
  var columnCW;
  var rowDir; /////////////

  if (wedge === 0) {
    wedgeCCW = 7;
    wedgeCW = 1;
  } else if (wedge === 7) {
    wedgeCCW = 6;
    wedgeCW = 0;
  } else {
    wedgeCCW = wedge - 1;
    wedgeCW = wedge + 1;
  }

  if (column === 0) {
    columnCCW = row * 2;
    columnCW = 1;
  } else if (column === row * 2) {
    columnCCW = row * 2 - 1;
    columnCW = 0;
  } else if (column === row * 2) {
    columnCCW = row * 2 - 1;
    columnCW = 0;
  }

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

  if (column % 2 !== 0) {
    neighborList.push({
      wedge: wedge,
      column: column,
      row: row - 1
    });
  } else if (row < this.size - 1) {
    neighborList.push({
      wedge: wedge,
      column: column,
      row: row + 1
    });
  }
  return neighborList;
};

goog.exportSymbol('utilities.NewStruct', utilities.NewStruct);

