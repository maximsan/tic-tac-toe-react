import Square from './Square';
import React from 'react';

class Board extends React.Component {
    render() {
        const squares = this.props.squares;

        const borderCells = squares.map((step, borderCell) => {

            return (
                <Square key={borderCell} value={this.props.squares[borderCell]}
                    onClick={() => this.props.onClick(borderCell)}></Square>
            );
        });

        return (
            <div>
                <div className="border">
                    <div className="border-row">
                        {borderCells}
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;

