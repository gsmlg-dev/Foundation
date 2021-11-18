import { PieceShape, PositionShape, ChessColor, PieceType } from './types';

const findPos = (pieces: PieceShape[], p: PositionShape): PieceShape | undefined => {
  return pieces.find(({ position: { x, y } }) => p.x === x && p.y === y);
};

const findGeneral= (pieces: PieceShape[], color: ChessColor) : PieceShape | undefined => {
  return pieces.find(({ color: c, type: t }) => t === 0 && c === color);
}

const canDrop = (item: PieceShape, pos: PositionShape, pieces: PieceShape[]) : boolean => { // eslint-disable-line complexity
  const fx = item.position.x;
  const fy = item.position.y;
  const tx = pos.x;
  const ty = pos.y;

  const target = findPos(pieces, pos);
  if (target && target.color === item.color) return false;

  const hasntPiece = (pos_: PositionShape): boolean => !findPos(pieces, pos_);

  const rk = findGeneral(pieces, ChessColor.Red);
  const bk = findGeneral(pieces, ChessColor.Black);
  if (!rk || !bk) return false;
  if (
    item.type !== 0 &&
    rk.position.x === bk.position.x &&
    fx === rk.position.x
  ) {
    let count = 0;
    for (let i = rk.position.y + 1; i < bk.position.y; i++) {
      if (!hasntPiece({ x: fx, y: i })) count++;
    }
    if (count === 1 && tx !== fx) return false;
  }

  switch (item.type) {
    case PieceType.General: // 帅
      if (tx < 3 || tx > 5) return false;
      if (item.color === 'red' && ty > 2) return false;
      if (item.color === 'black' && ty < 7) return false;
      if (item.color === 'red') {
        if (tx === bk.position.x) {
          let count = 0;
          for (let i = rk.position.y + 1; i < bk.position.y; i++) {
            if (!hasntPiece({ x: tx, y: i })) count++; // eslint-disable-line max-depth
          }
          if (count === 0) return false;
        }
      } else if (tx === rk.position.x) {
        let count = 0;
        for (let i = rk.position.y + 1; i < bk.position.y; i++) {
          if (!hasntPiece({ x: tx, y: i })) count++;
        }
        if (count === 0) return false;
      }
      if (tx === fx && (ty === fy + 1 || ty === fy - 1)) return true;
      if (ty === fy && (tx === fx + 1 || tx === fx - 1)) return true;
      return false;
    case PieceType.Advisor: // 士
      if (tx < 3 || tx > 5) return false;
      if (item.color === 'red' && ty > 2) return false;
      if (item.color === 'black' && ty < 7) return false;
      if (tx === fx + 1 && (ty === fy + 1 || ty === fy - 1)) return true;
      if (tx === fx - 1 && (ty === fy + 1 || ty === fy - 1)) return true;
      return false;
    case PieceType.Elephant: // 相
      if (item.color === 'red' && ty > 4) return false;
      if (item.color === 'black' && ty < 5) return false;
      if (hasntPiece({ x: fx - 1, y: fy - 1 })) {
        if (tx === fx - 2 && ty === fy - 2) return true;
      }
      if (hasntPiece({ x: fx - 1, y: fy + 1 })) {
        if (tx === fx - 2 && ty === fy + 2) return true;
      }
      if (hasntPiece({ x: fx + 1, y: fy - 1 })) {
        if (tx === fx + 2 && ty === fy - 2) return true;
      }
      if (hasntPiece({ x: fx + 1, y: fy + 1 })) {
        if (tx === fx + 2 && ty === fy + 2) return true;
      }
      return false;
    case PieceType.Horse: // 马
      if (hasntPiece({ x: fx - 1, y: fy })) {
        if (tx === fx - 2 && (ty === fy + 1 || ty === fy - 1)) return true;
      }
      if (hasntPiece({ x: fx + 1, y: fy })) {
        if (tx === fx + 2 && (ty === fy + 1 || ty === fy - 1)) return true;
      }
      if (hasntPiece({ x: fx, y: fy - 1 })) {
        if (ty === fy - 2 && (tx === fx + 1 || tx === fx - 1)) return true;
      }
      if (hasntPiece({ x: fx, y: fy + 1 })) {
        if (ty === fy + 2 && (tx === fx + 1 || tx === fx - 1)) return true;
      }
      return false;
    case PieceType.Chariot: // 车
      if (fx === tx) {
        let count = 0;
        if (ty > fy) {
          for (let i = fy + 1; i <= ty; i++) {
            if (findPos(pieces, { x: fx, y: i })) count++;
          }
        } else {
          for (let i = fy - 1; i >= ty; i--) {
            if (findPos(pieces, { x: fx, y: i })) count++;
          }
        }
        return count === 0 || (count === 1 && !!target);
      }
      if (fy === ty) {
        let count = 0;
        if (tx > fx) {
          for (let i = fx + 1; i <= tx; i++) {
            if (findPos(pieces, { x: i, y: fy })) count++;
          }
        } else {
          for (let i = fx - 1; i >= tx; i--) {
            if (findPos(pieces, { x: i, y: fy })) count++;
          }
        }
        return count === 0 || (count === 1 && !!target);
      }
      return false;

    case PieceType.Cannon: // 炮
      if (fx === tx) {
        let count = 0;
        if (ty > fy) {
          for (let i = fy + 1; i <= ty; i++) {
            if (findPos(pieces, { x: fx, y: i })) count++;
          }
        } else {
          for (let i = fy - 1; i >= ty; i--) {
            if (findPos(pieces, { x: fx, y: i })) count++;
          }
        }
        return count === 0 || (count === 2 && !!target);
      }
      if (fy === ty) {
        let count = 0;
        if (tx > fx) {
          for (let i = fx + 1; i <= tx; i++) {
            if (findPos(pieces, { x: i, y: fy })) count++;
          }
        } else {
          for (let i = fx - 1; i >= tx; i--) {
            if (findPos(pieces, { x: i, y: fy })) count++;
          }
        }
        return count === 0 || (count === 2 && !!target);
      }
      return false;

    case PieceType.Soldier: // 兵
      if (item.color === 'red') {
        if (item.position.y > 4) {
          return (
            (pos.x === item.position.x && pos.y === item.position.y + 1) ||
            (pos.x === item.position.x + 1 && pos.y === item.position.y) ||
            (pos.x === item.position.x - 1 && pos.y === item.position.y)
          );
        }
        return pos.x === item.position.x && pos.y === item.position.y + 1;
      }
      if (item.position.y < 5) {
        return (
          (pos.x === item.position.x && pos.y === item.position.y - 1) ||
          (pos.x === item.position.x + 1 && pos.y === item.position.y) ||
          (pos.x === item.position.x - 1 && pos.y === item.position.y)
        );
      }
      return pos.x === item.position.x && pos.y === item.position.y - 1;
    // no default
  }
  return false;
};

export default canDrop;
