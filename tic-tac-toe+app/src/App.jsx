import { useState } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/square.jsx'
import { TURNS, WINNER_COMBOS } from './components/constants.jsx'
import './App.css'



function App() { 

  const [board, setBoard] = useState(Array(9).fill(null))
  
  const[turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)//para detectar ganador. Null no hay ganador, false es empate

  const checkWinner =(boardToCheck) =>{
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a] //si hay ganador
      }
    }
    return null // si no hay ganador
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }
  const updateBoard = (index) =>{
    //si ya tiene algo la casilla, no la sobreescribe
    if(board[index] || winner) return // si hay ganador ya no juega mas.
    // actualiza tablero
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambia de turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //revisa si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return(
    <main className='board'>
    <h1>Tik Tak Toe Game</h1> 
      <section className='game'>
        {
          board.map((_, index) => {
            return(
              <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <button onClick={resetGame}>Play Again</button>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O} >{TURNS.O}</Square>
      </section>
      {
        winner != null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 'Draw!!' : 'Congratulations! The Winner is'
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Play Again</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  ) 
}

export default App
