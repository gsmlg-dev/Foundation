import React from 'react';
import styled from '@emotion/styled';

const Circle = styled.i<{ size: number }>`
  position: absolute;
  top: 0;
  right: 0;
  font-style: normal;
  text-align: center;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  line-height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  border: 1px solid #ddd;
  background: #eee;
`;

interface Props {
  size?: number;
}

export class RenderCount extends React.Component<Props> {
  _count = 0;

  render() {
    let count = this._count;
    count = count + 1;
    this._count = count;
    return <Circle size={this.props.size ?? 30}>{count}</Circle>;
  }
}

export default RenderCount;
