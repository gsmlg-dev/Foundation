import React from 'react';
import {DropTarget} from 'react-dnd';
import {PieceShape} from './types';

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const chessSquareTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    const {x, y, pieces} = props;
    return props.canDrop(item, {x, y}, pieces);
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    // const clientOffset = monitor.getClientOffset();
    // const componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    const isJustOverThisOne = monitor.isOver({shallow: true}); // eslint-disable-line

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop(); // eslint-disable-line
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();
    const {x, y} = props;

    // You can do something with it
    props.movePiece({item, position: {x, y}});
    props.kill();

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return {moved: true};
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true}),
    isDropable: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

interface Props {
  x: number;
  y: number;
  canDrop: (item: object, pos: object, pieces: object) => Boolean;
  connectDropTarget: any;
  piece: PieceShape | null;
  pieces: PieceShape[];
  movePiece: (item, object) => any;
  kill: () => any;
  isDropable: Boolean;
  children: any;
}

const Square = ({
  x,
  y,
  isDropable,
  connectDropTarget,
  piece,
  children,
}: Props) => {
  const bgColor = isDropable ? (piece ? 'red' : 'green') : 'transparent';

  return connectDropTarget(
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
      }}
    >
      <div
        style={{
          height: '1px',
          width: [0, 8].includes(x) ? '50%' : '100%',
          backgroundColor: 'black',
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
          backgroundColor: 'black',
          transform: `translate(30px, ${
            y === 0 || (y === 5 && ![0, 8].includes(x)) ? '30px' : 0
          })`,
        }}
      />
      {children}
    </div>,
  );
};

const ConnectedSquare = DropTarget('Piece', chessSquareTarget, collect)(Square);

export default ConnectedSquare;
