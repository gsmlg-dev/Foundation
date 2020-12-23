import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

LinkVerticalElbow.propTypes = {
  innerRef: PropTypes.func,
  before: PropTypes.bool,
  after: PropTypes.bool,
};

export default function LinkVerticalElbow({
  className,
  innerRef,
  data,
  before,
  after,
  x = (d) => d.x,
  y = (d) => d.y,
  ...restProps
}) {
  const line = (source, target) => {
    let b = target.y - source.y;
    let a = Math.abs(Math.tan(Math.PI / 4) * b);
    const c = target.x - source.x;

    const h = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2));
    const ab = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    /* 
      Check if the line between the two points is less than 
      the hypotenuse between a and b
    */
    if (h < ab) {
      a = target.x - source.x;
      b = Math.abs(Math.tan(Math.PI / 4) * a);

      if (target.y - source.y < 0) {
        b = -b;
      }
    } else if (target.x - source.x < 0) {
      a = -a;
    }

    return `
      M${x(source)},${y(source)}
      L${a},${b}
      L${x(target)},${y(target)}
    `;
  };

  return (
    <path
      ref={innerRef}
      className={cx('vx-link', className)}
      d={line(data.source, data.target)}
      {...restProps}
    />
  );
}
