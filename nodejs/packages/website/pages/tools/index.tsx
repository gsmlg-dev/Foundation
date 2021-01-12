/**
 *
 * Tools
 *
 */

import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Head from 'next/head';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Layout from 'components/Layout';

interface Props { }

const useStyles = makeStyles(theme => ({
  root: {
    margin: '1em',
  },
  paper: {
    margin: '1rem',
    padding: '1rem',
  },
  link: {
    textDecoration: 'none',
  },
  text: {
    fontSize: '1.44em',
  },
}));

function Tools(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = useStyles();

  return (
    <Layout>
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
    </Layout>
  );
}

export default Tools;
