import { useState } from 'react';
import Head from 'next/head'
import { makeStyles } from '@material-ui/styles';

import styles from '../styles/Home.module.css'
import Layout from '../components/Layout';


const useStyles = makeStyles(theme => ({
  h1: {
    color: 'red',
  }
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className={classes.h1}>hello world!</h1>
      </Layout>
    </div>
  )
}
