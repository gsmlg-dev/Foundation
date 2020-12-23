import { pointRadial } from 'd3-shape';
import getByKey from '@gsmlg/utils/getByKey';

export function findCollapsedParent(node) {
  if (!getByKey(node, ['data', 'isExpanded'])) {
    return node;
  }
  if (getByKey(node, 'parent')) {
    return findCollapsedParent(node.parent);
  }
  return null;
}

export function getTopLeft(node, layout, orientation) {
  if (layout === 'polar') {
    const [radialX, radialY] = pointRadial(node.x, node.y);
    return {
      top: radialY,
      left: radialX,
    };
  }
  if (orientation === 'vertical') {
    return {
      top: node.y,
      left: node.x,
    };
  }
  return {
    top: node.x,
    left: node.y,
  };
}
