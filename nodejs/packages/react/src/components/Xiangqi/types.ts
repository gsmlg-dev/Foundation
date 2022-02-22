/* --- STATE --- */
import { ReactChildren, ReactChild } from 'react';

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

export const ChessPieceDraggalbeType = 'GSMLG-Chess-Piece';

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
  kill: (item: PieceShape) => PieceShape;
  movePiece: (item: PieceShape, pos: PositionShape) => void;
  turn: ChessColor;
  readonly: boolean;
}

export interface ChessBoardProps extends DragDropContextProps {
  canDrop: (item: PieceShape, pos: PositionShape, pieces: PieceShape[]) => boolean;
  darkMode: boolean;
}

export interface SquareProps {
  x: number;
  y: number;
  canDrop: (item: PieceShape, pos: PositionShape, pieces: PieceShape[]) => boolean;
  piece: PieceShape | null | undefined;
  pieces: PieceShape[];
  movePiece: (item: PieceShape, pos: PositionShape) => void;
  kill: () => void;
  children: ReactChild | ReactChildren | null;
  readonly: boolean;
  darkMode: boolean;
}

export interface PieceProps {
  item: PieceShape;
  turn: ChessColor;
  readonly: boolean;
  darkMode: boolean;
}
