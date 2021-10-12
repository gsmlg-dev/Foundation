/**
 *
 * Xiangqi
 *
 */

import React, {useEffect, useMemo} from 'react';
import { styled } from '@mui/material/styles';

import Head from 'next/head';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Layout from 'components/Layout';
import GameBoard from 'components/Xiangqi/DndContext';

import {ChessColor} from 'types/xiangqi';

const StyledGrid = styled(Grid)(({
  theme
}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
const BoardPaper = styled(Paper)(({
  theme
}) => ({
  width: '540px',
  height: '600px',
}));
const ActionPaper = styled(Paper)(({
  theme
}) => ({
  width: '320px',
  height: '600px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));
const ActionButton = styled(Button)(({
  theme
}) => ({
  margin: theme.spacing(1),
}));

interface Props {}

function Xiangqi(props: Props) {

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
        <StyledGrid item xs={12} sm={12}>
          <BoardPaper>
            <GameBoard
              redPieces={xiangqi.redPieces}
              blackPieces={xiangqi.blackPieces}
              turn={xiangqi.turn}
              kill={kill}
              movePiece={movePiece}
            />
          </BoardPaper>
          <ActionPaper>
            <ActionButton
              variant="contained"
              color="primary"
            >
              回合： {xiangqi.turn}
            </ActionButton>
            <ActionButton
              variant="contained"
              color="primary"
              onClick={start}
            >
              Start Game
            </ActionButton>
          </ActionPaper>
        </StyledGrid>
      </Grid>
    </Layout>
  );
}

export default Xiangqi;
