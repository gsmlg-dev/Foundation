import uuid from '@gsmlg/utils/uuid';
import React from 'react';
import NetworkGraph from '../src/NetworkGraph';

const  getRandomID = () => uuid();

const defaultNodes = [
  {
    x: 10,
    y: 0,
    id: getRandomID(),
    fill: '#e03131',
    label: 'StatefulSet A',
    kind: 'StatefulSet',
  },
  {
    x: 20,
    y: 0,
    id: getRandomID(),
    fill: '#5f3dc4',
    label: 'DaemonSet B',
    kind: 'DaemonSet',
  },
  {
    x: 10,
    y: 10,
    id: getRandomID(),
    label: 'Deployment C',
    kind: 'Deployment',
  },
  {
    x: 10,
    y: 20,
    id: getRandomID(),
    label: 'Pod',
    kind: 'Pod',
  },
];

const defaultLinks = [
  {
    source: defaultNodes[1],
    target: defaultNodes[2],
    id: getRandomID(),
  },
  {
    source: defaultNodes[0],
    target: defaultNodes[2],
    id: getRandomID(),
  },
  {
    source: defaultNodes[0],
    target: defaultNodes[1],
    id: getRandomID(),
  },
  {
    source: defaultNodes[1],
    target: defaultNodes[0],
    id: getRandomID(),
  },
  {
    source: defaultNodes[1],
    target: defaultNodes[3],
    id: getRandomID(),
  },
];

const data = {
  nodes: defaultNodes,
  links: defaultLinks,
};

export const Base = () => (
  <div>
    <h3>NetworkGraph</h3>
    <div>
      <NetworkGraph
        width={800}
        height={400}
        graph={data}
      />
    </div>
    <div>
      <pre>
        {`Supported Props:
propTypes = {

  // used by withTooltip
  getRects: _propTypes2.default.func,
  rect: rectShape,
  parentRect: rectShape,
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  style: PropTypes.object,
  HoverStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  renderTooltip: PropTypes.func,
  styles: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  TooltipComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  tooltipProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tooltipTimeout: PropTypes.number,

  // used by self
  ariaLabel: PropTypes.string.isRequired,
  animated: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  graph: PropTypes.shape({
    nodes: PropTypes.array.isRequired,
    links: PropTypes.array.isRequired,
  }).isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
  }),
  renderLink: PropTypes.func,
  renderNode: PropTypes.func,
  renderTooltip: PropTypes.func,
  snapTooltipToDataX: PropTypes.bool,
  snapTooltipToDataY: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  eventTriggerRefs: PropTypes.func,
  waitingForLayoutLabel: PropTypes.string,
  width: PropTypes.number.isRequired,
  layout: layoutShape,
  preserveAspectRatio: PropTypes.bool,
  scaleToFit: PropTypes.bool,
};

Default Props:
defaultProps = {
  className: null,
  HoverStyles: () => (
    <style type="text/css">
      {\`
      .vx-arc:hover,
      .vx-bar:hover,
      .vx-glyph-dot:hover {
        opacity: 0.7;
      }
    \`}
    </style>
  ),
  renderTooltip: null,
  styles: { display: 'inline-block', position: 'relative' },
  TooltipComponent: TooltipWithBounds,
  tooltipProps: null,
  tooltipTimeout: 200,
};
`}
      </pre>
    </div>
  </div>
);

Base.story = {
  name: '<NetworkGraph />',
};

export default {
  title: 'NetworkGraph',
};
