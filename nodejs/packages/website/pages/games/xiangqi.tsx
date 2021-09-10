/**
 *
 * Xiangqi
 *
 */

import React, {useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Layout from 'components/Layout';
import GameBoard from 'components/Xiangqi/DndContext';

import {ChessColor} from 'types/xiangqi';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'flex',
    justifyContent: 'center',
  },
  boardPaper: {
    width: '540px',
    height: '600px',
  },
  paper: {
    width: '320px',
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

interface Props {}

function Xiangqi(props: Props) {
  const classes = useStyles();

  const xiangqi = {
    turn: ChessColor.Red,
    redPieces: [],
    blackPieces: [],
  };
  const start = () => {};
  const kill = () => {};
  const movePiece = () => {};

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout>
      <Head>
        <title>Xiangqi</title>
        <meta name="description" content="Description of Xiangqi" />
      </Head>
      <Grid container>
        <Grid item xs={12} sm={12} className={classes.grid}>
          <Paper className={classes.boardPaper}>
            <GameBoard
              redPieces={xiangqi.redPieces}
              blackPieces={xiangqi.blackPieces}
              turn={xiangqi.turn}
              kill={kill}
              movePiece={movePiece}
            />
          </Paper>
          <Paper className={classes.paper}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              回合： {xiangqi.turn}
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={start}
            >
              Start Game
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Xiangqi;
