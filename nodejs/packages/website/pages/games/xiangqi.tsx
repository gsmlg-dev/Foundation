/**
 *
 * Xiangqi
 *
 */

import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';

import Head from 'next/head';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Layout from 'components/Layout';
import GameBoard from 'components/Xiangqi/DndContext';

import {ChessColor} from 'types/xiangqi';

import { useChannel } from 'phoenix-provider';

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
  const channel = useChannel('room:chess');

  const _xiangqi = {
    turn: ChessColor.Red,
    redPieces: [],
    blackPieces: [],
  };
  const [xiangqi, setXiangqi] = useState(_xiangqi);
  const start = () => {
    channel?.push('start');
  };
  const kill = () => {};
  const movePiece = (payload) => {
    channel?.push('move_chess', payload);
  };

  const setPieces = ({ redPieces, blackPieces }) => {
    setXiangqi({
      ...xiangqi,
      redPieces,
      blackPieces,
    });
  };
  const changeTurn = (turn) => {
    setXiangqi({
      ...xiangqi,
      turn,
    });
  };
  const movePieceRemote = (item, position) => {
    const turn = item.color === ChessColor.Red ? ChessColor.Black : ChessColor.Red;
    const chessColor = item.color === ChessColor.Red ? 'redPieces' : 'blackPieces';
    const index = Number(item.id.slice(1));
    const chesses = xiangqi[chessColor].slice();
    chesses[index].position = position;
    setXiangqi({
      ...xiangqi,
      turn,
      [chessColor]: chesses,
    });
  };

  useEffect(() => {
    if (channel) {
      if (!channel.isJoined()) {
        channel.join();
      }
      channel.on('init_pieces', ({ pieces , turn}) => {
        setPieces(pieces);
        changeTurn(turn);
      });
      channel.on('move_chess_remote', ({ item, position, pieces }) => {
        movePieceRemote(item, position);
        setPieces(pieces);
      });
      return () => {
        channel.off();
        channel.leave();
        // socket.remove(channel);
      };
    }
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
