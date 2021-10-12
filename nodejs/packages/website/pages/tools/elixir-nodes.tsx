/**
 *
 * ElixirNodes
 *
 */

import React, {useEffect, useCallback} from 'react';
import { styled } from '@mui/material/styles';

import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import ComputerIcon from '@material-ui/icons/Computer';
import CloudIcon from '@material-ui/icons/Cloud';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import Layout from 'components/Layout';

const PREFIX = 'ElixirNodes';

const classes = {
  root: `${PREFIX}-root`,
  card: `${PREFIX}-card`,
  details: `${PREFIX}-details`,
  chip: `${PREFIX}-chip`,
  avatar: `${PREFIX}-avatar`
};

const StyledLayout = styled(Layout)((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    marginTop: '1em',
  },

  [`& .${classes.card}`]: {
    display: 'flex',
  },

  [`& .${classes.details}`]: {
    display: 'flex',
    flexDirection: 'column',
  },

  [`& .${classes.chip}`]: {
    margin: '0.618em',
  },

  [`& .${classes.avatar}`]: {
    display: 'flex',
  }
}));

interface Props {}

function ElixirNodes(props: Props) {


  const elixirNodes = {
    name: 'self',
    nodes: [],
    node_list: [],
    from: {},
    isAlive: false,
  };

  useEffect(() => {
    return () => {};
  }, []);

  const content = useCallback(
    (state) => {
      if (!state || !state.nodes) return null;

      return (
        <CardContent>
          {state.nodes.map((n) => (
            <Chip
              key={n}
              className={classes.chip}
              label={n}
              avatar={
                <Avatar>
                  {state.node_list.includes(n) ? (
                    <CloudIcon />
                  ) : (
                    <CloudOffIcon />
                  )}
                </Avatar>
              }
            />
          ))}
        </CardContent>
      );
    },
    [classes.chip],
  );

  return (
    <StyledLayout>
      <Head>
        <title>ElixirNodes</title>
        <meta name="description" content="Description of ElixirNodes" />
      </Head>
      <Grid container justify="center" className={classes.root}>
        <Grid item md={11} sm={10}>
          <Grid container spacing={6} justify="center">
            <Grid key={elixirNodes.name} item md={3} sm={4}>
              <Paper>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="Recipe" className={classes.avatar}>
                        <ComputerIcon />
                      </Avatar>
                    }
                    title={elixirNodes.name}
                    subheader={elixirNodes.isAlive ? 'Started' : 'Stopped'}
                  />
                </Card>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={6} justify="center">
            {elixirNodes.nodes.map((name) => (
              <Grid key={name} item md={3} sm={4}>
                <Paper>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                          {elixirNodes.node_list.includes(name) ? (
                            <CloudIcon />
                          ) : (
                            <CloudOffIcon />
                          )}
                        </Avatar>
                      }
                      title={name}
                    />
                    <Divider />
                    {content(elixirNodes.from[name])}
                  </Card>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </StyledLayout>
  );
}

export default ElixirNodes;
