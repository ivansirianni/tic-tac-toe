export const TURNS ={
    X: 'x',
    O: 'o'
  }
  
  
  
 export const WINNER_COMBOS = [
    //siempre yendo de izquierda a derecha
    [0, 1, 2], // horizontal 1
    [3, 4, 5], // horizontal 2
    [6, 7, 8], // horizontal 3
    [0, 3, 6], // vertical 1
    [1, 4, 7], // vertical 2
    [2, 5, 8], // vertical 3
    [0, 4, 8], // diagonal 1
    [2, 4, 6]  // diagonal 2
  ]