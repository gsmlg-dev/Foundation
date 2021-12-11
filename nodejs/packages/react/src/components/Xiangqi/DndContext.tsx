/**
 *
 * DragDropContext
 *
 */

import React, { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

import { DragDropContextProps } from './types';
import { ChessBoard } from './ChessBoard';
import canDrop from './canDrop';

const DragDropContext : React.FC<DragDropContextProps> = (props) => {
  const [hasTouch, setTouchable] = useState(false);
  useEffect(() => {
    let touchable = false;
    if ('ontouchstart' in window.document.documentElement) {
      touchable = true;
    }
    if (window.navigator.hasOwnProperty('pointerEnabled')) {
      touchable = true;
    }
    if (window.navigator.hasOwnProperty('msPointerEnabled')) {
      touchable = true;
    }
    setTouchable(touchable);
  }, []);
  const { redPieces, blackPieces, kill, movePiece, turn } = props;

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
