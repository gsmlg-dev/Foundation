/**
 *
 * Lambo
 *
 */
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React, {useEffect, useCallback, useState} from 'react';

import Head from 'next/head';
import Layout from 'components/Layout';
 
import Lambo from 'components/ThreeFiber/Lambo';

interface Props {}
 
function LamboPage(props: Props) {
 
  return (
    <Layout>
      <Head>
        <title>Three Fiber Lambo</title>
        <meta name="description" content="Description of Lambo" />
      </Head>
      <div
        css={css`
          flex: 1 1 auto;
        `}
      >
        <Lambo />
      </div>
    </Layout>
  );
};

export default LamboPage;
 