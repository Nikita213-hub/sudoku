module.exports = function solveSudoku(matrix) {
  // your solution
  let arr = [];
  let temp;
  let horizontal = [];
  let vertical = []; 

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (matrix[x][y] === 0) {
        horizontal.push(x);
        vertical.push(y);
        matrix[x][y] = propos(find(matrix, x, y), temp);
        if (!matrix[x][y]) {
          recElements(matrix, x, y);
          function recElements(matrix, x, y) {
            temp = matrix[horizontal[horizontal.length - 2]][vertical[vertical.length - 2]];
            matrix[x][y] = 0;
            matrix[horizontal[horizontal.length - 2]][vertical[vertical.length - 2]] = 0; 
            x = horizontal[horizontal.length - 2]; 
            y = vertical[vertical.length - 2];
            horizontal.splice(horizontal.length - 1);
            vertical.splice(vertical.length - 1);
            if (propos(find(matrix, x, y), temp)) {
              matrix[x][y] = propos(find(matrix, x, y), temp);
              temp = 0;
            } else {
              matrix[x][y] = 0;
              recElements(matrix, horizontal[horizontal.length - 2], vertical[vertical.length - 2]); 
            }
          }
          x = horizontal[horizontal.length - 1];
          y = vertical[vertical.length - 1];
        }
      }
    }
  }
  function propos(array, temp) {
    if (temp) {
      return array[array.indexOf(temp) + 1];
    } else return array[0];
  }
  function find(matrix, x, y) {
    let row = matrix[x],
    column = getCol(matrix, y),
    grid = getGrid(matrix, x, y),
    imposNumb = [].concat(row, column, grid).filter(num => num > 0);
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr = numbers.filter(num => !imposNumb.includes(num)).filter((a, b) => a - b);
    return arr;
  }
  function getCol(matrix, y) {
    return matrix.map((row) => row[y]);
  };
  function getGrid(matrix, x, y) {
    let arrayGrid = [];
    x = Math.floor(x / 3) * 3;
    y = Math.floor(y / 3) * 3;
    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        arrayGrid.push(matrix[i][j]);
      }
    }
    return arrayGrid;
  }
  return matrix;
}
