import * as React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import LinearProgress from '@mui/material/LinearProgress';

export const Linear = React.forwardRef<HTMLDivElement>((props, ref) => {
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
      <LinearProgress style={{ width: '61.8%' }} />
    </div>
  );
});
Linear.displayName = 'LinearLoading';

export default Linear;
