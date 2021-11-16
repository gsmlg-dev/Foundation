import {useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Layout from 'components/Layout';

import WobblingSphere from 'components/ThreeFiber/WobblingSphere';

const PagePaper = styled(Paper)(({
  theme
}) => ({
  flex: 1,
  padding: theme.spacing(3),
  margin: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));
const TitleTypography = styled(Typography)(({
  theme
}) => ({
  fontSize: '3rem',
  transition: '3000ms all',
  display: 'inline-flex',
}));

export default function Home() {

  const ref = useRef();
  const [size, setSize] = useState({ width: 800, height: 480 });
  useEffect(() => {
    if (ref.current) {
      const resize = () => {
        const { innerWidth, innerHeight } = window;
        const width = innerWidth - 24 * 4;
        const height = innerHeight - 64 - 32 - 24 * 4 - 20;
        // console.log( width, height );
        setSize({ width, height });
      }
      window.addEventListener('resize', resize);

      resize();

      return () => {
        window.removeEventListener('resize', resize);
      };
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <PagePaper elevation={4} ref={ref}>
        <WobblingSphere size={size} />
      </PagePaper>
    </Layout>
  );
}
