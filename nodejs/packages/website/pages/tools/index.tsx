/**
 *
 * Tools
 *
 */

import React from 'react';
import { styled } from '@mui/material/styles';

import Head from 'next/head';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Layout from 'components/Layout';

const PagePaper = styled(Paper)(({
  theme
}) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));
const StyledTypography = styled(Typography)(({
  theme,
}) => ({
  fontSize: '1.44rem',
  fontWeight: 400,
}));

interface Props {}

function Tools(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <Layout>
      <Head>
        <title>Tools</title>
        <meta name="description" content="Description of Tools" />
      </Head>
      <Grid container justifyContent="center">
        <Grid item md={11}>
          <Grid container>
            <Grid item md={4}>
              <PagePaper>
                <Link href="/tools/vultr-latency">
                  <a>
                    <StyledTypography>
                      Vultr Networks Latency
                    </StyledTypography>
                  </a>
                </Link>
              </PagePaper>
              <PagePaper>
                <Link href="/tools/elixir-nodes">
                  <a>
                    <StyledTypography>
                      Elixir Nodes
                    </StyledTypography>
                  </a>
                </Link>
              </PagePaper>
              <PagePaper>
                <Link href="/tools/three-fiber">
                  <a>
                    <StyledTypography>
                      Three Fiber
                    </StyledTypography>
                  </a>
                </Link>
              </PagePaper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Tools;
