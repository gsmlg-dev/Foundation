import React from 'react';
import styled from '@emotion/styled';

type RenderProps = {
  size: number
}

const Circle = styled.i<RenderProps>`
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

export class RenderCount extends React.Component<RenderProps> {
  static defaultProps = { size: 30 }

  private _count = 0

  render() {
    let count = this._count;
    count = count + 1;
    this._count = count;
    return <Circle size={this.props.size}>{count}</Circle>;
  }
}

export default RenderCount;
