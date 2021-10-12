import {useState, useEffect} from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Layout from 'components/Layout';

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

  const [colors, setColors] = useState(['#000', '#000', '#000', '#000']);
  useEffect(() => {
    const randomRGB = () => {
      const r = ((Math.random() * 10e16) % 0xff).toString(16);
      const g = ((Math.random() * 10e16) % 0xff).toString(16);
      const b = ((Math.random() * 10e16) % 0xff).toString(16);
      return `#${r}${g}${b}`;
    };
    setColors([randomRGB(), randomRGB(), randomRGB(), randomRGB()]);
    const t = setInterval(() => {
      setColors([randomRGB(), randomRGB(), randomRGB(), randomRGB()]);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <PagePaper elevation={4}>
        <TitleTypography
          style={{color: colors[0]}}
        >
          吾日三省吾身
        </TitleTypography>
        <TitleTypography
          style={{color: colors[1]}}
        >
          为人谋而不忠乎
        </TitleTypography>
        <TitleTypography
          style={{color: colors[2]}}
        >
          与朋友交而不信乎
        </TitleTypography>
        <TitleTypography
          style={{color: colors[3]}}
        >
          传不习乎
        </TitleTypography>
      </PagePaper>
    </Layout>
  );
}
