/**
 *
 * Game
 *
 */

import React, {memo} from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';

import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const PREFIX = 'Game';

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  text: `${PREFIX}-text`
};

const StyledLayout = styled(Layout)((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    marginTop: '1em',
  },

  [`& .${classes.paper}`]: {
    padding: '1em',
  },

  [`& .${classes.text}`]: {
    fontSize: '1.44em',
  }
}));

interface Props {}

const Game = memo((props: Props) => {


  return (
    <StyledLayout>
      <Head>
        <title>Games</title>
        <meta name="description" content="Description of Games" />
      </Head>
      <Grid container justify="center" className={classes.root}>
        <Grid item md={11}>
          <Grid container>
            <Grid item md={4}>
              <Paper className={classes.paper}>
                <Link href="/games/xiangqi">
                  <a>
                    <Typography className={classes.text} component="h3">
                      中国象棋
                    </Typography>
                  </a>
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledLayout>
  );
});

export default Game;
