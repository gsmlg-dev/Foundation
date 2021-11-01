/**
 *
 * ElixirNodes
 *
 */
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React, {useEffect, useCallback, useState} from 'react';

import Head from 'next/head';
import Grid from '@mui/material/Grid';
import Layout from 'components/Layout';
 
import Cloud from 'components/ThreeFiber/Cloud';

interface Props {}
 
function CloudPage(props: Props) {
 
  return (
    <Layout>
      <Head>
        <title>Three Fiber Cloud</title>
        <meta name="description" content="Description of Cloud" />
      </Head>
      <div
        css={css`
          flex: 1 1 auto;
        `}
      >
        <Cloud />
      </div>
    </Layout>
  );
};
 
 export default CloudPage;
 