import React from 'react';
import { DragSource, DragSourceSpec, DragSourceCollector } from 'react-dnd';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { usePrefersColorScheme } from '../../hooks/usePrefersColorScheme';

import {
  PieceShape,
  DragSourceProps,
  DropResult,
  DragSourceCollectedProps,
  PieceProps,
  ChessColor,
} from './types';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource: DragSourceSpec<DragSourceProps, PieceShape, DropResult> = {
  canDrag(props) {
    return props.item.color === props.turn;
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.item.id;
  },

  beginDrag(props, _monitor, _component) {
    // Return the data describing the dragged item
    const item = props.item;
    return item;
  },

  endDrag(props, monitor, _component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    const item = monitor.getItem(); // eslint-disable-line

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult(); // eslint-disable-line

    // This is a good place to call some Flux action
    // CardActions.moveCardToList(item.id, dropResult.listId);
  },
};

/**
 * Specifies which props to inject into your component.
 */
const collect: DragSourceCollector<DragSourceCollectedProps, object> = function collect(
  connect,
  monitor,
) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  };
};

const Piece : React.FC<PieceProps> = ({ connectDragSource, item }) => {
  const preferColor = usePrefersColorScheme();
  let itemColor : ChessColor | 'white' = item.color;
  if (preferColor === 'dark' && itemColor === ChessColor.Black) {
    itemColor = 'white';
  }
  return connectDragSource(
    <div
      css={css`
        width: 50px;
        height: 50px;
        position: absolute;
        left: 50%;
        top: 50%;
        marginTop: -25px;
        marginLeft: -25px;
        fontSize: 30px;
        textAlign: center;
        lineHeight: 50px;
        border: 1px solid ${preferColor === 'dark' ? 'white' : 'black'};
        borderRadius: 50%;
        background-color: ${preferColor === 'dark' ? 'black' : 'white'};
        userSelect: none;
        color: ${itemColor};
      `}
    >
      {item.name}
    </div>,
  );
};

export default DragSource('Piece', cardSource, collect)(Piece);
