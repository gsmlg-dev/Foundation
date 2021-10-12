/**
 *
 * Tools
 *
 */

import React from 'react';
import { styled } from '@mui/material/styles';

import Head from 'next/head';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Layout from 'components/Layout';

const PREFIX = 'Tools';

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  link: `${PREFIX}-link`,
  text: `${PREFIX}-text`
};

const StyledLayout = styled(Layout)((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    margin: '1em',
  },

  [`& .${classes.paper}`]: {
    margin: '1rem',
    padding: '1rem',
  },

  [`& .${classes.link}`]: {
    textDecoration: 'none',
  },

  [`& .${classes.text}`]: {
    fontSize: '1.44em',
  }
}));

interface Props {}

function Tools(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  return (
    <StyledLayout>
      <Head>
        <title>Tools</title>
        <meta name="description" content="Description of Tools" />
      </Head>
      <Grid container justify="center" className={classes.root}>
        <Grid item md={11}>
          <Grid container>
            <Grid item md={4}>
              <Paper className={classes.paper}>
                <Link href="/tools/vultr-latency">
                  <a>
                    <Typography className={classes.text} component="h3">
                      Vultr Networks Latency
                    </Typography>
                  </a>
                </Link>
              </Paper>
              <Paper className={classes.paper}>
                <Link href="/tools/elixir-nodes">
                  <a>
                    <Typography className={classes.text} component="h3">
                      Elixir Nodes
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
}

export default Tools;
