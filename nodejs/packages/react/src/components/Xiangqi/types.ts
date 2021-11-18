/* --- STATE --- */
import { ReactChildren, ReactChild } from 'react';
import { ConnectDragSource, ConnectDropTarget } from 'react-dnd';
import { Identifier } from 'dnd-core'

export enum ChessColor {
  Black = 'black',
  Red = 'red',
}

export enum PieceType {
  General = 0, // 帅
  Advisor = 1, // 士
  Elephant = 2, // 相
  Horse = 3, // 马
  Chariot = 4, // 车
  Cannon = 5, // 炮
  Soldier = 6, // 兵
}

export type PositionShape = {
  x: number;
  y: number;
};

export type PieceShape = {
  id: string;
  name: string;
  type: PieceType;
  color: ChessColor;
  position: PositionShape;
  live: boolean;
};

export interface XiangqiState {
  redPieces: PieceShape[];
  blackPieces: PieceShape[];
  turn: ChessColor;
  channel: object | null;
}

export type ContainerState = XiangqiState;

export interface DragDropContextProps {
  redPieces: PieceShape[];
  blackPieces: PieceShape[];
  kill: (item: object) => PieceShape;
  movePiece: (item: object) => PieceShape;
  turn: ChessColor;
}

export interface ChessBoardProps {
  redPieces: PieceShape[];
  blackPieces: PieceShape[];
  kill: (item: object) => PieceShape;
  movePiece: (item: PieceShape, pos: object) => PieceShape;
  canDrop: (item: object, pos: object, pieces: object) => boolean;
  turn: ChessColor;
}

export interface SquareProps {
  x: number;
  y: number;
  canDrop: (item: PieceShape, pos: PositionShape, pieces: PieceShape[]) => boolean;
  connectDropTarget: ConnectDropTarget;
  piece: PieceShape | null;
  pieces: PieceShape[];
  movePiece: (item: PieceShape, pos: PositionShape) => DropResult;
  kill: () => void;
  isDropable: boolean;
  children: ReactChild | ReactChildren;
}

export interface PieceProps extends DragSourceCollectedProps {
  item: PieceShape
}

export interface DragSourceProps {
  item: PieceShape
  turn: ChessColor
}

export interface DragSourceCollectedProps {
  connectDragSource: ConnectDragSource
  isDragging: boolean
}

export interface DropResult {
  moved: boolean
}

export interface DropTargetCollectedProps {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: ConnectDropTarget
    // You can ask the monitor about the current drag state:
    isOver: boolean
    isOverCurrent: boolean
    isDropable: boolean
    itemType: Identifier | null,
}