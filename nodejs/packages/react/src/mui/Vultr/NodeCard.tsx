import * as React from 'react';

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

type Host = {
  name: string
  host: string
  delay?: number
  minDelay?: number
  maxDelay?: number
  averageDelay?: number
  lost?: number
  times?: number
}

interface NodeCardProps {
  host: Host
}

export const NodeCard = React.forwardRef<HTMLDivElement, NodeCardProps>(({ host, ...props }, ref) => {
  return (
    <Paper {...props} ref={ref}>
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="Recipe">{host.name[0]}</Avatar>}
          title={host.name}
          subheader={host.host}
        />
        <Divider />
        <CardContent>
          <Typography component="div">
            <span>Delay: </span>
            <span>{host.delay}ms</span>
            <Divider />
            <span>Min Delay: </span>
            <span>{host.minDelay}ms</span>
            <Divider />
            <span>Max Delay: </span>
            <span>{host.maxDelay}ms</span>
            <Divider />
            <span>Average Delay: </span>
            <span>{host.averageDelay}ms</span>
            <Divider />
            <span>Package Lost: </span>
            <span>{host.lost}%</span>
            <Divider />
            <span>Times: </span>
            <span>{host.times}</span>
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
});

NodeCard.displayName = 'NodeCard';

export default NodeCard;
