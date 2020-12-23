import React, { Fragment } from 'react';
import { Group } from '@vx/group';
import { NodeGroup } from 'react-move';

import Link from './Link';
import { findCollapsedParent } from './utils';

function Links({ links, linkType, layout, orientation, stepPercent }) {
  return (
    <NodeGroup
      data={links}
      keyAccessor={(d, i) => `${d.source.data.name}_${d.target.data.name}`}
      start={({ source, target }) => ({
        source: {
          x: source.x,
          y: source.y,
        },
        target: {
          x: source.x,
          y: source.y,
        },
      })}
      enter={({ source, target }) => ({
        source: {
          x: [source.x],
          y: [source.y],
        },
        target: {
          x: [target.x],
          y: [target.y],
        },
      })}
      update={({ source, target }) => ({
        source: {
          x: [source.x],
          y: [source.y],
        },
        target: {
          x: [target.x],
          y: [target.y],
        },
      })}
      leave={({ source, target }) => {
        const collapsedParent = findCollapsedParent(source);
        return {
          source: {
            x: [collapsedParent.x],
            y: [collapsedParent.y],
          },
          target: {
            x: [collapsedParent.x],
            y: [collapsedParent.y],
          },
        };
      }}
    >
      {(nodes) => (
        <Group>
          {nodes.map(({ key, data, state }) => (
            <Link
              data={state}
              linkType={linkType}
              layout={layout}
              orientation={orientation}
              stepPercent={stepPercent}
              stroke="#374469"
              strokeWidth="1"
              fill="none"
              key={key}
            />
          ))}
        </Group>
      )}
    </NodeGroup>
  );
}

export default Links;
