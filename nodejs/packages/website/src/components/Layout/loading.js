import React from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from './index';

const PREFIX = 'loading';

const classes = {
  root: `${PREFIX}-root`
};

const StyledLayout = styled(Layout)((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

function LayoutLoading(props, ref) {


  return (
    <StyledLayout ref={ref}>
      <div className={classes.root}>
        <CircularProgress />
      </div>
    </StyledLayout>
  );
}

export default React.forwardRef(LayoutLoading);
