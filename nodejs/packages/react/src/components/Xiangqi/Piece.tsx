import React from 'react';
import { useDrag } from 'react-dnd';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { PieceProps, ChessColor, ChessPieceDraggalbeType } from './types';

const Piece: React.FC<PieceProps> = ({ item, turn, readonly, darkMode }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: ChessPieceDraggalbeType,
    item,
    canDrag(_monitor) {
      if (readonly) return false;
      return item.color === turn;
    },

    isDragging(monitor) {
      return monitor.getItem().id === item.id;
    },
    collect(monitor) {
      return {
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging(),
      };
    },
  }));

  let itemColor: ChessColor | 'white' = item.color;
  if (darkMode && itemColor === ChessColor.Black) {
    itemColor = 'white';
  }
  return (
    <div
      css={css`
        width: 50px;
        height: 50px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -25px;
        margin-left: -25px;
        font-size: 30px;
        text-align: center;
        line-height: 50px;
        border: 1px solid ${darkMode ? 'white' : 'black'};
        border-radius: 50%;
        background-color: ${darkMode ? 'black' : 'white'};
        user-select: none;
        color: ${itemColor};
      `}
      ref={collected.isDragging ? dragPreview : drag}
    >
      {item.name}
    </div>
  );
};

export default Piece;
