import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from './index';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function LayoutLoading(props, ref) {
  const classes = useStyles();

  return (
    <Layout ref={ref}>
      <div className={classes.root}>
        <CircularProgress />
      </div>
    </Layout>
  );
}

export default React.forwardRef(LayoutLoading);
