import * as React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CircularProgress from '@mui/material/CircularProgress';

export const Circular = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      css={css`
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
      `}
      {...props}
      ref={ref}
    >
      <CircularProgress />
    </div>
  );
});
Circular.displayName = 'CircularLoading';

export default Circular;
