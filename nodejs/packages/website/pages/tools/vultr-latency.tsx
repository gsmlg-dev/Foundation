/**
 *
 * VultrNetworks
 *
 */

import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';

import Head from 'next/head';
import Grid from '@mui/material/Grid';

import Layout from 'components/Layout';
import NodeCard from '@gsmlg/react/dist/mui/Vultr/NodeCard';

const Hosts = [
  {
    host: 'fra-de-ping.vultr.com',
    name: '法兰克福',
  },
  {
    host: 'ams-nl-ping.vultr.com',
    name: '阿姆斯特丹',
  },
  {
    host: 'par-fr-ping.vultr.com',
    name: '巴黎',
  },
  {
    host: 'lon-gb-ping.vultr.com',
    name: '伦敦',
  },
  {
    host: 'sgp-ping.vultr.com',
    name: '新加坡',
  },
  {
    host: 'hnd-jp-ping.vultr.com',
    name: '东京',
  },
  {
    host: 'nj-us-ping.vultr.com',
    name: '新泽西',
  },
  {
    host: 'il-us-ping.vultr.com',
    name: '芝加哥',
  },
  {
    host: 'ga-us-ping.vultr.com',
    name: '亚特兰大',
  },
  {
    host: 'wa-us-ping.vultr.com',
    name: '西雅图',
  },
  {
    host: 'fl-us-ping.vultr.com',
    name: '迈阿密',
  },
  {
    host: 'tx-us-ping.vultr.com',
    name: '达拉斯',
  },
  {
    host: 'sjo-ca-us-ping.vultr.com',
    name: '硅谷',
  },
  {
    host: 'lax-ca-us-ping.vultr.com',
    name: '洛杉矶',
  },
  {
    host: 'syd-au-ping.vultr.com',
    name: '悉尼',
  },
];

const vultrHosts = Hosts.map(
  ({name, host}) => ({
    id: host.replace('-ping.vultr.com', ''),
    ping: [],
    pending: false,
    name,
    host,
    times: 0,
    lost: 0,
    delay: -1,
    minDelay: -1,
    maxDelay: -1,
    averageDelay: -1,
  }),
);

const StyledGrid = styled(Grid)(({
  theme
}) => ({
  padding: theme.spacing(3),
}));


function VultrNetworks() {
  const [networks, setNetworks] = useState(vultrHosts);

  useEffect(() => {
    let isStopped: boolean = false;
    const run = async () => {
      out:
      while (true) {
        for (let h of vultrHosts) {
          if (isStopped) break out;
          const {host, id} = h;
          let newNetworks;
          try {
            const req = new Request(`//${host}`, {method: 'HEAD'});
            const start = Date.now();
            await fetch(req);
            const time = Date.now() - start;
            newNetworks = networks.reduce((list, host) => {
              if (id === host.id) {
                host.pending = false;
                host.ping.push(time);
              }
              return list.concat(host);
            }, []);
          } catch (e) {
            newNetworks = networks.reduce((list, host) => {
              if (id === host.id) {
                host.pending = false;
                host.ping.push(NaN);
              }
              return list.concat(host);
            }, []);
          }
          const computed = newNetworks.map((site) => {
            const {ping} = site;
            const delay = ping[ping.length - 1];
            const success = ping.filter((p) => !Number.isNaN(p));
            const averageDelay =
              success.reduce((all, p) => all + p, 0) / success.length;
            return {
              ...site,
              delay: delay == null ? NaN : delay,
              lost: (
                ((ping.length - success.length) / ping.length) *
                100
              ).toFixed(),
              times: ping.length,
              minDelay: Math.min(...success),
              maxDelay: Math.max(...success),
              averageDelay: Number.isNaN(averageDelay)
                ? NaN
                : Math.round(averageDelay),
            };
          });
          computed.sort(({averageDelay: m}, {averageDelay: n}) => {
            if (Number.isNaN(m)) return 1;
            if (m === n) return 0;
            return m > n ? 1 : -1;
          });
          setNetworks(computed);
          await new Promise((resolve, r) => {
            setTimeout(resolve, 1000);
          });
        }
      }
    };
    run();
    return () => {
      isStopped = true;
    };
  }, []); // eslint-disable-line

  return (
    <Layout>
      <Head>
        <title>VultrNetworks</title>
        <meta name="description" content="Description of VultrNetworks" />
      </Head>
      <StyledGrid container justifyContent="center" spacing={6}>
        <Grid item md={11} sm={2}>
          <Grid container spacing={6} justifyContent="center">
            {networks.map((host) => (
              <Grid key={host.host} item md={3} sm={4}>
                <NodeCard host={host} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </StyledGrid>
    </Layout>
  );
}

export default VultrNetworks;
