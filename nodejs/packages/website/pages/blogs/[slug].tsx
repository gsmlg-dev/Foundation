import { useState, useEffect } from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/styles';

import { timer, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, takeUntil } from 'rxjs/operators';

import ReactMarkdown from 'react-markdown'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Layout from 'components/Layout';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: any) => ({
  root: theme.mixins.gutters({
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing(3),
  }),
}));

const menus = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blogs' },
];

interface BlogStruct {
  id: number;
  author: string;
  title: string;
  name: string;
  date: string;
  content: string;
}

export default function Blog() {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState({} as BlogStruct);

  useEffect(() => {
    if (slug === undefined) return null;
    const ob = fromFetch(`/api/blogs/${slug}`)
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
      setBlog(data);
    });
    return () => subscriber.unsubscribe();
  }, [slug]);

  return (
    <Layout menus={menus}>
      <Head>
        <title>{blog && blog.title ? blog.title : slug}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper className={classes.root} elevation={4}>
        <header>
          <Typography component="h1">{blog.title}</Typography>
          <Typography component="div">
            Author:
            {blog.author}
          </Typography>
          <Typography component="div">
            Created At:
            {blog.date}
          </Typography>
        </header>
        <Divider />
        <Typography className="blog-content" component="section">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </Typography>
      </Paper>
    </Layout>
  );
}
