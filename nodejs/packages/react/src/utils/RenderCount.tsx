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

export class RenderCount extends React.Component<RenderProps, {}, {render: number}> {
  static defaultProps = { size: 30 }

  renders = 0

  render() {
    return <Circle size={this.props.size}>{++this.renders}</Circle>;
  }
}

export default RenderCount;
