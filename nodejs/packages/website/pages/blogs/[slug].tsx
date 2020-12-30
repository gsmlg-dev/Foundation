import { useState, useEffect } from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/styles';

import { timer, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, takeUntil } from 'rxjs/operators';

import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WebIcon from '@material-ui/icons/Web';

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
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blogs' },
];

export default function Home() {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const ob = fromFetch('/api/blogs')
      .pipe(
        switchMap((resp) => {
          if (resp.ok)
            return resp.json();
          else {
            return of({ error: true, message: `Error ${resp.status}` });
          }
        }),
        catchError(err => {
          // Network or other error, handle appropriately
          console.error(err);
          return of({ error: true, message: err.message })
        }),
        takeUntil(timer(5e3))
      );
    const subscriber = ob.subscribe((data) => {
      setBlogs(data);
    });
    return () => subscriber.unsubscribe();
  }, []);

  return (
    <Layout menus={menus}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper className={classes.root} elevation={4}>
        <List>
          {blogs.map(
            (blog): JSX.Element => (
              <ListItem
                key={blog.name}
                component={'a'}
              >
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText primary={<Link href={`/blogs/${blog.name}`}>{blog.title}</Link>} />
                <ListItemText secondary={blog.date} />
              </ListItem>
            ),
          )}
        </List>
      </Paper>
    </Layout>
  );
}
