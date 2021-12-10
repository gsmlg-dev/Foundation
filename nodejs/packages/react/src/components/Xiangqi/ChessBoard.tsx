/**
 *
 * ChessBoard
 *
 */

import React from 'react';

import Square from './Square';
import Piece from './Piece';

import { ChessBoardProps } from './types';

export const ChessBoard = ({
  blackPieces,
  redPieces,
  movePiece,
  turn,
  kill,
  canDrop,
}: ChessBoardProps) => {
  const allPieces = redPieces.concat(blackPieces);

  const renderSquare = (i): JSX.Element => {
    const x = i % 9;
    const y = Math.floor(i / 9);
    const pieces = allPieces.filter((p) => p.live);
    const item = pieces.find(({ position: { x: px, y: py } }) => px === x && py === y);
    const key = item ? <Piece item={item} turn={turn} /> : null;
    const killPiece = () => {
      if (item) kill(item);
    };

    return (
      <div
        key={`key-${i}`}
        style={{
          width: '60px',
          height: '60px',
          position: 'relative',
          backgroundColor: 'transparent',
        }}
      >
        <Square
          piece={item}
          x={x}
          y={y}
          movePiece={movePiece}
          pieces={pieces}
          kill={killPiece}
          canDrop={canDrop}
        >
          {key}
        </Square>
      </div>
    );
  };

  const squares = [] as JSX.Element[];
  for (let i = 0; i < 90; i += 1) {
    squares.push(renderSquare(i));
  }

  return (
    <div
      style={{
        width: '540px',
        height: '600px',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
      }}
    >
      {squares}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '25%',
          marginTop: '-30px',
          height: '60px',
          lineHeight: '60px',
          fontSize: '24px',
          userSelect: 'none',
        }}
      >
        楚 河
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '25%',
          marginTop: '-30px',
          height: '60px',
          lineHeight: '60px',
          fontSize: '24px',
          userSelect: 'none',
        }}
      >
        漢 界
      </div>
    </div>
  );
};

export default ChessBoard;
