import React from 'react';
import {styled} from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import Layout from './index';

const StyledDiv = styled('div')(({theme}) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));

function LayoutLoading(props, ref) {
  return (
    <Layout ref={ref}>
      <StyledDiv>
        <CircularProgress />
      </StyledDiv>
    </Layout>
  );
}

export default React.forwardRef(LayoutLoading);
