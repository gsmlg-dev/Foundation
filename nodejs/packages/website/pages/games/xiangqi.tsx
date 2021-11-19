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
import GameBoard from '@gsmlg/react/dist/components/Xiangqi/DndContext';
import {PieceShape, PositionShape, ChessColor} from '@gsmlg/react/dist/components/Xiangqi/types';

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
    if (channel && channel.isJoined()) {
      channel.push('start');
    }
  }, [channel]);
  const kill = (piece) => {
    piece.live = false;
    return piece;
  };
  const movePiece = (piece: PieceShape, pos: PositionShape) => {
    channel?.push('move_chess', { item: piece, position: pos });
  };

  const setPieces = useCallback(({ redPieces, blackPieces }) => {
    setXiangqi({
      redPieces,
      blackPieces,
    });
  }, []);

  const movePieceRemote = useCallback((item, position) => {
    const turn = item.color === ChessColor.Red ? ChessColor.Black : ChessColor.Red;
    setTurn(turn);
  }, []);

  useEffect(() => {
    if (channel) {
      if (!channel.isJoined()) {
        channel.join();
      }
      
      return () => {
        channel.leave();
        socket.remove(channel);
      };
    }
  }, [channel, socket]); // eslint-disable-line

  useEffect(() => {
    if (channel) {
      channel.on('init_pieces', ({ pieces , turn}) => {
        setPieces({
          redPieces: pieces.filter((p) => p.color === ChessColor.Red),
          blackPieces: pieces.filter((p) => p.color === ChessColor.Black),
        });
        setTurn(turn);
      });
      channel.on('move_chess_remote', ({ item, position, pieces }) => {
        movePieceRemote(item, position);
        setPieces({
          redPieces: pieces.filter((p) => p.color === ChessColor.Red),
          blackPieces: pieces.filter((p) => p.color === ChessColor.Black),
        });
      });
      return () => {
        channel.off();
      };
    }
  }, [channel, xiangqi, movePieceRemote, setPieces]); // eslint-disable-line

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
