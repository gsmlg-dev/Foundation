import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Xiangqi from './DndContext';
import sampleData from './Xiangqi.sample.json';

import { DragDropContextProps, ChessColor, PieceShape, PositionShape } from './types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Xiangqi',
  component: Xiangqi,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    turn: ChessColor,
  },
} as ComponentMeta<typeof Xiangqi>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Xiangqi> = (args) => <Xiangqi {...args} />;

export const Sample = Template.bind({});

const red = sampleData.pieces.filter((p) => p.color === ChessColor.Red);
const black = sampleData.pieces.filter((p) => p.color === ChessColor.Black);

Sample.args = {
  redPieces: red,
  blackPieces: black,
  kill: (item: PieceShape) => {
    item.live = false;
    const list = item.color === ChessColor.Red ? red : black;
    const idx = list.findIndex((p) => p.id === item.id);
    list.splice(idx, 1);
  },
  movePiece: (item: PieceShape, pos: PositionShape) => {
    item.position = pos;
    const list = item.color === ChessColor.Red ? red : black;
    const idx = list.findIndex((p) => p.id === item.id);
    list.splice(idx, 1, item);
  },
  turn: ChessColor.Red,
};

