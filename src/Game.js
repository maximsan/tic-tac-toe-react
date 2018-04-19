import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];

        const squares = current.squares.slice();
        if (squares[i] || whoIsWinner(squares)) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo(step) {
        if (!step) {
            this.setState({
                history: [{ squares: Array(9).fill(null) }],
            })
        }
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = whoIsWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to position № ' + move :
                'Go to start';

            return (
                <li key={move}>
                    <button className="move" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        var status;

        if (winner) {
            status = 'Winner is ' + winner;
        }
        else {
            status = 'Next is ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="game">
                    <Board squares={current.squares}
                        onClick={(i) => this.handleClick(i)} />

                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol className="moves">{moves}</ol>
                </div>
            </div>
        );
    }
}

function whoIsWinner(squares) {
    const combination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < combination.length; i++) {
        const [el1, el2, el3] = combination[i];
        if (squares[el1] && squares[el1] === squares[el2] && squares[el1] === squares[el3]) {
            return squares[el1];
        }
    }
    return null;
}

