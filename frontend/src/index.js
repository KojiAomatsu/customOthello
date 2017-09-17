import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
function Square(props){
    return (
      <button className="square" onClick={() => props.onClick()}>
        {props.value}
      </button>
    );
  }

class Board extends React.Component {
  

  renderSquare(i) {
    return (
     <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
       />
    );
  }

  // render() {
  //   const winner = calculateWinner(this.state.squares);
  //   let status;
  //   if(winner){
  //     status = 'Winner: ' + winner;
  //   }else {
  //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  //   }

  render(){

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor()  {
    super();
    this.state = {
      history : [{
        squares : Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext : true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
      squares : squares,
       }]),
       stepNumber: history.length,
      xIsNext : !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext : (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return(
      <li key={move}>
        <a href="" onClick={() => this.jumpTo(move)}>{desc}</a>
      </li>
      );
    });

    let status;

    if(winner){
      status = 'Winner: ' + winner;
    }else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
  let lines = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j< 2; j++) {
      lines.push([i+j,i+j+1,i+j+2]);
      lines.push([i+j*4,i+j*4+4,i+j*4+8]);
    }
  }
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j< 2; j++) {
      lines.push([i+j*4,i+j*4+5,i+j*4+10]);
      lines.push([i+j*4+2,i+j*4+4+1,i+j*4+8]);
    }
  }
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

registerServiceWorker();
