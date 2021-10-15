/**
 *
 * ElixirNodes
 *
 */

import React, {useEffect, useCallback, useState} from 'react';
import { styled } from '@mui/material/styles';

import Head from 'next/head';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ComputerIcon from '@mui/icons-material/Computer';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import Layout from 'components/Layout';

import { useSocket, useChannel } from 'phoenix-provider';

const StyledGrid = styled(Grid)(({
  theme
}) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));

interface Props {}

function ElixirNodes(props: Props) {

  const [elixirNodes, setElixirNodes] = useState({
    name: 'self',
    nodes: [],
    node_list: [],
    from: {},
    isAlive: false,
  });
  const nodeState = (data) => {
    setElixirNodes({
      ...elixirNodes,
      ...data,
    });
  };
  const nodeInfo = ({ from, ...info }) => {
    let state = { 
      ...elixirNodes,
      from: {
        ...elixirNodes.from,
        [from]: {
          ...elixirNodes.from[from],
          ...info,
        },
      }
    };
    if (from === elixirNodes.name) {
      state = { ...state, ...info };
    }
    setElixirNodes(state);
  };
  const listInfo = ({ from, ...info }) => {
    let state = { 
      ...elixirNodes,
      from: {
        ...elixirNodes.from,
        [from]: {
          ...elixirNodes.from[from],
          ...info,
        },
      }
    };
    if (from === elixirNodes.name) {
      state = { ...state, ...info };
    }
    setElixirNodes(state);
  };

  const socket = useSocket();
  const channel = useChannel('node:lobby');

  useEffect(() => {
    if (socket && channel) {
      if (!channel.isJoined()) {
        channel.join();
      }
      channel.on('node_state', (data) => {
        nodeState(data);
      });
      channel.on('node_info', (data) => {
        nodeInfo(data);
      });
      channel.on('list_info', (data) => {
        listInfo(data);
      });
      return () => {
        channel.leave();
        socket.remove(channel);
      };
    }
  }, []);

  const content = useCallback(
    (state) => {
      if (!state || !state.nodes) return null;

      return (
        <CardContent>
          {state.nodes.map((n) => (
            <Chip
              key={n}
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
    [],
  );

  return (
    <Layout>
      <Head>
        <title>ElixirNodes</title>
        <meta name="description" content="Description of ElixirNodes" />
      </Head>
      <StyledGrid container justifyContent="center">
        <Grid item md={11} sm={10}>
          <Grid container spacing={6} justifyContent="center">
            <Grid key={elixirNodes.name} item md={3} sm={4}>
              <Paper>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="Recipe">
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
          <Grid container spacing={6} justifyContent="center">
            {elixirNodes.nodes.map((name) => (
              <Grid key={name} item md={3} sm={4}>
                <Paper>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="Recipe">
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
      </StyledGrid>
    </Layout>
  );
}

export default ElixirNodes;
