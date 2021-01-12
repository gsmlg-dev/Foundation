const find = (pieces, { position: p }) => {
  return pieces.find(({ position: { x, y } }) => p.x === x && p.y === y);
};

const canDrop = (item, pos, pieces) => {
  const fx = item.position.x;
  const fy = item.position.y;
  const tx = pos.x;
  const ty = pos.y;

  const target = find(pieces, { position: pos });
  if (target && target.color === item.color) return false;

  const hasntPiece = pos_ => !find(pieces, { position: pos_ });

  const rk = find(pieces, { color: 'red', type: 0 });
  const bk = find(pieces, { color: 'black', type: 0 });
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
    case 0: // 帅
      if (tx < 3 || tx > 5) return false;
      if (item.color === 'red' && ty > 2) return false;
      if (item.color === 'black' && ty < 7) return false;
      if (item.color === 'red') {
        if (tx === bk.position.x) {
          let count = 0;
          for (let i = rk.position.y + 1; i < bk.position.y; i++) {
            if (!hasntPiece({ x: tx, y: i })) count++;
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
    case 1: // 士
      if (tx < 3 || tx > 5) return false;
      if (item.color === 'red' && ty > 2) return false;
      if (item.color === 'black' && ty < 7) return false;
      if (tx === fx + 1 && (ty === fy + 1 || ty === fy - 1)) return true;
      if (tx === fx - 1 && (ty === fy + 1 || ty === fy - 1)) return true;
      return false;
    case 2: // 相
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
    case 3: // 马
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
    case 4: // 车
      if (fx === tx) {
        let count = 0;
        if (ty > fy) {
          for (let i = fy + 1; i <= ty; i++) {
            if (find(pieces, { position: { x: fx, y: i } })) count++;
          }
        } else {
          for (let i = fy - 1; i >= ty; i--) {
            if (find(pieces, { position: { x: fx, y: i } })) count++;
          }
        }
        return count === 0 || (count === 1 && target);
      }
      if (fy === ty) {
        let count = 0;
        if (tx > fx) {
          for (let i = fx + 1; i <= tx; i++) {
            if (find(pieces, { position: { x: i, y: fy } })) count++;
          }
        } else {
          for (let i = fx - 1; i >= tx; i--) {
            if (find(pieces, { position: { x: i, y: fy } })) count++;
          }
        }
        return count === 0 || (count === 1 && target);
      }
      return false;

    case 5: // 炮
      if (fx === tx) {
        let count = 0;
        if (ty > fy) {
          for (let i = fy + 1; i <= ty; i++) {
            if (find(pieces, { position: { x: fx, y: i } })) count++;
          }
        } else {
          for (let i = fy - 1; i >= ty; i--) {
            if (find(pieces, { position: { x: fx, y: i } })) count++;
          }
        }
        return count === 0 || (count === 2 && target);
      }
      if (fy === ty) {
        let count = 0;
        if (tx > fx) {
          for (let i = fx + 1; i <= tx; i++) {
            if (find(pieces, { position: { x: i, y: fy } })) count++;
          }
        } else {
          for (let i = fx - 1; i >= tx; i--) {
            if (find(pieces, { position: { x: i, y: fy } })) count++;
          }
        }
        return count === 0 || (count === 2 && target);
      }
      return false;

    case 6: // 兵
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
