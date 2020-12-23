import React from 'react';
import _ from 'lodash';

import {
  Network, networkPropTypes,
  withScreenSize, withParentSize, ParentSize,
  nodeShape, linkShape,
  Node, Nodes,
  Link, Links,
  AtlasForceDirectedLayout,
  WithTooltip, withTooltipPropTypes,
} from '@data-ui/network';
import { Group } from '@vx/group';

import DirectedLink from './NetworkGraph/DirectedLink';
import WorkloadNode from './NetworkGraph/WorkloadNode';

export {
  Network, networkPropTypes,
  withScreenSize, withParentSize, ParentSize,
  nodeShape, linkShape,
  Node, Nodes,
  Link, Links,
  DirectedLink,
  AtlasForceDirectedLayout,
  WithTooltip, withTooltipPropTypes,
};

class NetworkGraph extends Network {

  componentWillReceiveProps(nextProps) {
    const {
      graph,
      animated,
      width,
      height,
      margin,
      renderTooltip,
      preserveAspectRatio,
      scaleToFit,
    } = nextProps;
    const {
      graph: currGraph,
      width: currWidth,
      height: currHeight,
      margin: currMargin,
    } = this.props;
    const { computingLayout } = this.state;
    if (
      !renderTooltip &&
      (graph.links !== currGraph.links ||
       graph.nodes !== currGraph.nodes ||
        computingLayout ||
        (this.layout.setBoundingBox &&
          (width !== currWidth || height !== currHeight || margin !== currMargin)))
    ) {
      this.layout.clear();
      // this.setState(() => ({ computingLayout: true }));
      this.layout.setGraph(graph);
      this.layout.setAnimated(animated);

      // For certain cases, a layout algorithm need to be aware of the actual width, height, etc.,
      // for better layout optimization. Here we pass the width, height, and margin info to the
      // layout instance if setBoundingBox funtion is defined.
      if (this.layout.setBoundingBox) {
        this.layout.setBoundingBox({
          width,
          height,
          margin,
        });
      }
      this.layout.layout({
        callback: nextGraph => {
          this.setGraphState({
            graph: nextGraph,
            width,
            height,
            margin,
            preserveAspectRatio,
            scaleToFit,
          });
        },
      });
    } else {
      this.setGraphState({ graph, width, height, margin, preserveAspectRatio, scaleToFit });
    }
  }

  render() {
    const {
      ariaLabel,
      children,
      className,
      height,
      renderLink,
      renderNode,
      renderTooltip,
      waitingForLayoutLabel,
      width,
    } = this.props;

    const { graph, computingLayout } = this.state;

    if (renderTooltip) {
      return (
        <WithTooltip renderTooltip={renderTooltip}>
          <NetworkGraph {...this.props} renderTooltip={null} />
        </WithTooltip>
      );
    }

    return (
      <svg aria-label={ariaLabel} className={className} role="img" width={width} height={height}>
        {graph && (
          <Group transform="scale(0.9)">
            <Links
              links={graph.links}
              linkComponent={renderLink || Link}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              onMouseMove={this.handleMouseMove}
              onClick={this.handleClick}
            />
            <Nodes
              nodes={graph.nodes}
              nodeComponent={renderNode || Node}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              onMouseMove={this.handleMouseMove}
              onClick={this.handleClick}
            />
          </Group>
        )}

        {children}

        {computingLayout && waitingForLayoutLabel && (
          <Group>
            <rect width={width} height={height} opacity={0.8} fill="#ffffff" />
            <text
              x={width / 2}
              y={height / 2}
              textAnchor="middle"
              stroke="#ffffff"
              paintOrder="stroke"
            >
              {waitingForLayoutLabel}
            </text>
          </Group>
        )}
      </svg>
    );
  }
}

NetworkGraph.defaultProps = {
  ...Network.defaultProps,
  renderNode: WorkloadNode,
  renderLink: DirectedLink,
  renderTooltip({ data }) {
    const { x, y, label } = data;

    return (
      <div>
        {label && (
          <div>
            <strong>{label}</strong>
          </div>
        )}
        <div>
          <strong> data </strong>
          <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export default NetworkGraph;
