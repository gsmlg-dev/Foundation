/**
 *
 * Xiangqi
 *
 */

import React, {useEffect, useState, useCallback} from 'react';
import { styled } from '@mui/material/styles';

import Head from 'next/head';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Layout from 'components/Layout';
import GameBoard from 'components/Xiangqi/DndContext';

import {ChessColor} from 'types/xiangqi';

import { useSocket, useChannel } from 'phoenix-provider';

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
  const socket = useSocket();
  const channel = useChannel('room:chess');

  const _xiangqi = {
    redPieces: [],
    blackPieces: [],
  };
  const [xiangqi, setXiangqi] = useState(_xiangqi);
  const [turn, setTurn] = useState(ChessColor.Red);
  const start = useCallback(() => {
    channel?.push('start');
  }, [channel]);
  const kill = () => {};
  const movePiece = useCallback((payload) => {
    channel?.push('move_chess', payload);
  }, [channel]);

  const setPieces = useCallback(({ redPieces, blackPieces }) => {
    setXiangqi({
      ...xiangqi,
      redPieces,
      blackPieces,
    });
  }, [xiangqi]);

  const movePieceRemote = useCallback((item, position) => {
    const turn = item.color === ChessColor.Red ? ChessColor.Black : ChessColor.Red;
    const chessColor = item.color === ChessColor.Red ? 'redPieces' : 'blackPieces';
    const index = Number(item.id.slice(1));
    const chesses = xiangqi[chessColor].slice();
    chesses[index].position = position;
    setXiangqi({
      ...xiangqi,
      [chessColor]: chesses,
    });
    setTurn(turn);
  }, [xiangqi]);

  useEffect(() => {
    if (channel) {
      if (!channel.isJoined()) {
        channel.join();
      }
      console.log(socket);
      console.log(channel);
      channel.on('init_pieces', ({ pieces , turn}) => {
        setPieces({
          redPieces: pieces.filter((p) => p.color === ChessColor.Red),
          blackPieces: pieces.filter((p) => p.color === ChessColor.Black),
        });
        setTurn(turn);
      });
      channel.on('move_chess_remote', ({ item, position, pieces }) => {
        movePieceRemote(item, position);
        setPieces(pieces);
      });
      return () => {
        channel.off();
        channel.leave();
        socket.remove(channel);
      };
    }
  }, [channel, socket, setPieces, movePieceRemote]);

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
              turn={turn}
              kill={kill}
              movePiece={movePiece}
            />
          </BoardPaper>
          <ActionPaper>
            <ActionButton
              variant="contained"
              color="primary"
            >
              回合： {turn}
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
