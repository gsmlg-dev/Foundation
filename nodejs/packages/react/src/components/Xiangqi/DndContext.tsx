/**
 *
 * DragDropContext
 *
 */

import React, { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import { useTouchable } from '../../hooks/useTouchable';
import { usePrefersColorScheme } from '../../hooks/usePrefersColorScheme';

import { DragDropContextProps } from './types';
import { ChessBoard } from './ChessBoard';
import canDrop from './canDrop';

const DragDropContext : React.FC<DragDropContextProps> = (props) => {
  const touchable = useTouchable();
  const colorScheme = usePrefersColorScheme();
  const { redPieces, blackPieces, kill, movePiece, turn, readonly } = props;
  const darkMode = colorScheme === 'dark';

  return (
    <DndProvider backend={touchable ? TouchBackend : HTML5Backend}>
      <ChessBoard
        redPieces={redPieces}
        blackPieces={blackPieces}
        kill={kill}
        movePiece={movePiece}
        canDrop={canDrop}
        turn={turn}
        readonly={readonly}
        darkMode={darkMode}
      />
    </DndProvider>
  );
};

export default DragDropContext;
