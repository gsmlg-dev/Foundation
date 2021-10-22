/**
 *
 * ElixirNodes
 *
 */

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
    <Cloud />
    </Layout>
  );
};
 
 export default CloudPage;
 