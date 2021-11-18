/**
 *
 * DragDropContext
 *
 */

import React, {useState, useEffect} from 'react';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {TouchBackend} from 'react-dnd-touch-backend';
import {DndProvider} from 'react-dnd';

import {PieceShape, ChessColor} from 'types/xiangqi';
import {ChessBoard} from './ChessBoard';
import canDrop from './canDrop';

interface Props {
  redPieces: PieceShape[];
  blackPieces: PieceShape[];
  kill: (item: object) => any;
  movePiece: (item: object) => any;
  turn: ChessColor;
}

const DragDropContext = (props: Props) => {
  const [hasTouch, setTouchable] = useState(false);
  useEffect(() => {
    let touchable = false;
    if ('ontouchstart' in window.document.documentElement) {
      touchable = true;
    }
    if (
        window.navigator.hasOwnProperty('pointerEnabled') 
        || window.navigator.hasOwnProperty('msPointerEnabled')
      ) {
      touchable = true;
    }
    setTouchable(touchable);
  }, []);
  const {redPieces, blackPieces, kill, movePiece, turn} = props;

  return (
    <DndProvider backend={hasTouch ? TouchBackend : HTML5Backend}>
      <ChessBoard
        redPieces={redPieces}
        blackPieces={blackPieces}
        kill={kill}
        movePiece={movePiece}
        canDrop={canDrop}
        turn={turn}
      />
    </DndProvider>
  );
};

export default DragDropContext;
