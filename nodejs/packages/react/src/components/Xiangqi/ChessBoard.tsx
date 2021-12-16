/**
 *
 * ChessBoard
 *
 */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

import Square from './Square';
import Piece from './Piece';

import { ChessBoardProps } from './types';

export const ChessBoard : React.FC<ChessBoardProps> = ({
  blackPieces,
  redPieces,
  movePiece,
  turn,
  kill,
  canDrop,
  readonly,
  darkMode,
}) => {
  const allPieces = redPieces.concat(blackPieces);

  const renderSquare = (i : number): JSX.Element => {
    const x = i % 9;
    const y = Math.floor(i / 9);
    const pieces = allPieces.filter((p) => p.live);
    const item = pieces.find(({ position: { x: px, y: py } }) => px === x && py === y);
    const key = item ? (
      <Piece 
        item={item}
        turn={turn}
        readonly={readonly}
        darkMode={darkMode}
      />
    ) : null;
    const killPiece = () => {
      if (item) kill(item);
    };

    return (
      <div
        key={`key-${i}`}
        css={css`
          width: 60px;
          height: 60px;
          position: relative;
          background-color: transparent;
        `}
      >
        <Square
          piece={item}
          x={x}
          y={y}
          movePiece={movePiece}
          pieces={pieces}
          kill={killPiece}
          canDrop={canDrop}
          readonly={readonly}
          darkMode={darkMode}
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
      css={css`
        width: 540px;
        height: 600px;
        display: flex;
        flex-wrap: wrap;
        position: relative;
      `}
    >
      {squares}
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 25%;
          margin-top: -30px;
          height: 60px;
          line-height: 60px;
          font-size: 24px;
          user-select: none;
        `}
      >
        楚 河
      </div>
      <div
        css={css`
          position: absolute;
          top: 50%;
          right: 25%;
          margin-top: -30px;
          height: 60px;
          line-height: 60px;
          font-size: 24px;
          user-select: none;
        `}
      >
        漢 界
      </div>
    </div>
  );
};

export default ChessBoard;
