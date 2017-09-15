// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

function Square(props) {
  return (
      <button className="square" onClick={() => props.onClick()}>
        {props.value}
      </button>
  );
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xNext: true,
    };
  }
  nextPlayer() {
    return this.state.xNext ? 'X' : 'O';
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner() || squares[i]) {
      return;
    }
    squares[i] = this.nextPlayer();
    this.setState({
      squares: squares,
      xNext: !this.state.xNext,
    });
  }
  calculateWinner() {
    const b =  this.state.squares;
    if (b[0] == b[1] && b[0] == b[2] && b[0] !== null) {return b[0];}
    if (b[0] == b[4] && b[0] == b[8] && b[0] !== null) {return b[0];}
    if (b[0] == b[3] && b[0] == b[6] && b[0] !== null) {return b[0];}
    if (b[1] == b[4] && b[1] == b[7] && b[1] !== null) {return b[1];}
    if (b[2] == b[5] && b[2] == b[8] && b[2] !== null) {return b[2];}
    if (b[2] == b[4] && b[2] == b[6] && b[2] !== null) {return b[2];}
    if (b[3] == b[4] && b[3] == b[5] && b[3] !== null) {return b[3];}
    if (b[6] == b[7] && b[6] == b[8] && b[6] !== null) {return b[6];}
    return false;
  }
  newGame() {
    this.setState({
      squares: Array(9).fill(null),
      xNext: true,
    });
  }

  render() {
    const winner = this.calculateWinner();
    let status;
    if (winner) {
      status = `${winner} won the game!`;
    } else {
      status = `Next player: ${this.nextPlayer()}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div><button onClick={() => this.newGame()} className="new-game">New Game</button> </div>
      </div>

    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
