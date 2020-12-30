import {useState, useEffect} from 'react';
import Head from 'next/head';
import {makeStyles} from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Layout from 'components/Layout';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing(3),
  }),
  text: {
    fontSize: '3rem',
    transition: '3000ms all',
  },
}));

const menus = [
  {name: 'Home', href: '/'},
  {name: 'Blog', href: '/blogs'},
];

export default function Home() {
  const classes = useStyles();
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
    <Layout menus={menus}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper className={classes.root} elevation={4}>
        <Typography
          component="h3"
          className={classes.text}
          style={{color: colors[0]}}
        >
          吾日三省吾身
        </Typography>
        <Typography
          component="h3"
          className={classes.text}
          style={{color: colors[1]}}
        >
          为人谋而不忠乎
        </Typography>
        <Typography
          component="h3"
          className={classes.text}
          style={{color: colors[2]}}
        >
          与朋友交而不信乎
        </Typography>
        <Typography
          component="h3"
          className={classes.text}
          style={{color: colors[3]}}
        >
          传不习乎
        </Typography>
      </Paper>
    </Layout>
  );
}
