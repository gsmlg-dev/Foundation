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
 
import Bottles from 'components/ThreeFiber/Bottles';

interface Props {}
 
function BottlesPage(props: Props) {
 
  return (
    <Layout>
      <Head>
        <title>Three Fiber Bottles</title>
        <meta name="description" content="Description of Bottles" />
      </Head>
      <div
        css={css`
          flex: 1 1 auto;
        `}
      >
        <Bottles />
      </div>
    </Layout>
  );
};
 
 export default BottlesPage;
 