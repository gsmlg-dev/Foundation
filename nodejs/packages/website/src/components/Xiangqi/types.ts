/* --- STATE --- */

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
  live: Boolean;
};

export interface XiangqiState {
  redPieces: PieceShape[];
  blackPieces: PieceShape[];
  turn: ChessColor;
  channel: object | null;
}

export type ContainerState = XiangqiState;
