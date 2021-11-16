/**
 *
 * Game
 *
 */

import * as React from 'react';
import { styled } from '@mui/material/styles';

import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const PagePaper = styled(Paper)(({
  theme
}) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));

interface Props {}

const Game = (props: Props) => {

  return (
    <Layout>
      <Head>
        <title>Games</title>
        <meta name="description" content="Description of Games" />
      </Head>
      <Grid container justifyContent="center">
        <Grid item md={11}>
          <Grid container>
            <Grid item md={4}>
              <PagePaper>
                <Link href="/games/xiangqi">
                  <a>
                    <Typography component="h3">
                      中国象棋
                    </Typography>
                  </a>
                </Link>
              </PagePaper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Game;
