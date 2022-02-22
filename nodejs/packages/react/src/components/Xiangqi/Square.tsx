import React from 'react';
import { useDrop } from 'react-dnd';
import { PieceShape, SquareProps, ChessPieceDraggalbeType } from './types';

const Square: React.FC<SquareProps> = ({
  x,
  y,
  pieces,
  piece,
  movePiece,
  kill,
  canDrop,
  children,
  readonly,
  darkMode,
}) => {
  const [collectedProps, drop] = useDrop({
    accept: ChessPieceDraggalbeType,
    canDrop(item: PieceShape, _monitor) {
      return canDrop(item, { x, y }, pieces);
    },

    hover(_item, monitor) {
      const isJustOverThisOne = monitor.isOver({ shallow: true }); // eslint-disable-line

      // You will receive hover() even for items for which canDrop() is false
      const canDrop = monitor.canDrop(); // eslint-disable-line
    },

    drop(item, monitor) {
      if (monitor.didDrop()) {
        // If you want, you can check whether some nested
        // target already handled drop
        return;
      }

      // You can do something with it
      movePiece(item, { x, y });
      kill();

      // You can also do nothing and return a drop result,
      // which will be available as monitor.getDropResult()
      // in the drag source's endDrag() method
      return { moved: true };
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        isDropable: monitor.canDrop(),
        itemType: monitor.getItemType(),
      };
    },
  });

  const bgColor =
    collectedProps.isDropable && !readonly ? (piece ? 'red' : 'green') : 'transparent';
  const lineColor = darkMode ? 'white' : 'black';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
      }}
      ref={readonly ? null : drop}
    >
      <div
        style={{
          height: '1px',
          width: [0, 8].includes(x) ? '50%' : '100%',
          backgroundColor: lineColor,
          transform: `translate(${x === 0 ? '30px' : 0}, 30px)`,
        }}
      />
      <div
        style={{
          height:
            [0, 9].includes(y) || ([4, 5].includes(y) && ![0, 8].includes(x))
              ? '50%'
              : '100%',
          width: '1px',
          backgroundColor: lineColor,
          transform: `translate(30px, ${
            y === 0 || (y === 5 && ![0, 8].includes(x)) ? '30px' : 0
          })`,
        }}
      />
      {children}
    </div>
  );
};

export default Square;
