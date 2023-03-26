import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [moves, setMoves] = useState(Array);
  let xIsNext = (moves.length%2===0);
  let buttonContainer = moves.length>0;
  function undo(){
    if(moves.length===0)return;
    let cur = moves.pop()
    const nextSquares = squares.slice();
    nextSquares[cur] = null;
    setSquares(nextSquares)
  }
  function reset(){
    setSquares(Array(9).fill(null))
    setMoves([])
  }
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    moves.push(i)
    setMoves(moves)
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext?'X':'O';
    setSquares(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if(moves.length===9){
    status = "Draw";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  const rowCount = 3, colCount = 3
  return (
    <>
    <div className='container'>
      <div className="status">{status}</div>
      <div className='board'>
        {[...new Array(rowCount)].map((x, rowIndex) => {
          return (
            <div className="board-row" key={rowIndex}>
              {[...new Array(colCount)].map((y, colIndex) => <Square key={rowIndex*colCount + colIndex} value={squares[rowIndex*colCount + colIndex]} onSquareClick={() => handleClick(rowIndex*colCount + colIndex)} /> )}
              
            </div>
          )
        })
        }
      </div>
      { buttonContainer && (<div className='button-container'>
        <button className='button1' onClick={()=>undo()}>Step Back</button>
        <button className='button1' onClick={()=>reset()}>RESET</button>
      </div>)
      }
    </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}