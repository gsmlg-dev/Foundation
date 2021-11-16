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
import Card from 'components/Vultr/NodeCard';

import hosts from 'vultrHosts';

const StyledGrid = styled(Grid)(({
  theme
}) => ({
  padding: theme.spacing(3),
}));

interface Props {}

function VultrNetworks(props: Props) {

  const [networks, setNetworks] = useState(hosts);

  useEffect(() => {
    let isStopped: boolean = false;
    const run = async () => {
      out:
      while (true) {
        for (let h of hosts) {
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
                <Card host={host} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </StyledGrid>
    </Layout>
  );
}

export default VultrNetworks;
