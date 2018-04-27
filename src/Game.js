import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [
                { squares: Array(9).fill(null) }
            ],
            stepNumber: 0,
            xIsNext: true,
            positions: [
                { col: 0, row: 0 }
            ],
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const positions = this.state.positions.slice(0, this.state.stepNumber + 1);

        let colNew = colNum(i);
        let rowNew = rowNum(i);

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
            xIsNext: !this.state.xIsNext,
            positions: positions.concat(
                { col: colNew, row: rowNew }
            ),
        })
    }

    jumpTo(step) {
        if (!step) {
            this.setState({
                history: [{ squares: Array(9).fill(null) }],
            })
        }
        const currentPos = this.state.positions.slice(0, step + 1);
        const history = this.state.history.slice(0, step + 1);

        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            positions: currentPos,
            history: history,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = whoIsWinner(current.squares);
        const positions = this.state.positions;

        const moves = history.map((step, move) => {
            let desc = move ?
                <span>Go to position ({positions[move].col}, {positions[move].row})</span> :
                <span>Go to start</span>;

            return (
                <li key={move} className="one-move">
                    <button className={'move ' + ((this.state.stepNumber === move) ? 'active' : '')} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        let winCells;

        if (winner) {
            status = 'Winner is ' + winner[0];
            winCells = winner.slice(1);
        }
        else if (this.state.stepNumber === 9) {
            status = 'Draw!!!'
        }
        else
            status = 'Next is ' + (this.state.xIsNext ? 'X' : 'O');


        return (
            <div className="rootOfGame">
                <h1 className="main-title">Tic-Tac-Toe</h1>
                <div className="game">
                    <Board squares={current.squares} winCells={winCells}
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

function colNum(i) {
    if (i === 0 || i === 3 || i === 6) return 0;
    if (i === 1 || i === 4 || i === 7) return 1;
    if (i === 2 || i === 5 || i === 8) return 2;
}

function rowNum(i) {
    if (i === 0 || i === 1 || i === 2) return 0;
    if (i === 3 || i === 4 || i === 5) return 1;
    if (i === 6 || i === 7 || i === 8) return 2;
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
            return [squares[el1], el1, el2, el3];
        }
    }
    return null;
}

