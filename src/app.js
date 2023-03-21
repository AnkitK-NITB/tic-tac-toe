import { useState } from "react";

function Square({value, onClickHandle}) {
  return <button className="square" onClick={onClickHandle}>{value}</button>
}
let xturn = true;
let winner;
export default function Board(){
  const [squares,setSquares] = useState(Array(9).fill(null))
  function handleClick(i){
    if(winner||squares[i]) return;
    const newSquares = squares.slice()
    newSquares[i] = xturn?'X':'O'; 
    setSquares(newSquares)
    xturn = 1 - xturn;
  }
  winner = calculateWinner(squares)
  let state;
  if(winner) state = "Winner: " + winner;
  else state = (xturn?'X':'O') + "'s turn";
  return (
    <>
      <div className="status">{state}</div>
      <div className="row">
        <Square value={squares[0]} onClickHandle={()=>handleClick(0)} />
        <Square value={squares[1]} onClickHandle={()=>handleClick(1)} />
        <Square value={squares[2]} onClickHandle={()=>handleClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onClickHandle={()=>handleClick(3)} />
        <Square value={squares[4]} onClickHandle={()=>handleClick(4)} />
        <Square value={squares[5]} onClickHandle={()=>handleClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onClickHandle={()=>handleClick(6)} />
        <Square value={squares[7]} onClickHandle={()=>handleClick(7)} />
        <Square value={squares[8]} onClickHandle={()=>handleClick(8)} />
      </div>
    </>
  )
}

function calculateWinner(squares) {
  const winstates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winstates.length; i++) {
    const [a, b, c] = winstates[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log("winner", squares[a])
      console.log(a,b,c)
      return squares[a];
    }
  }
  return null;
}