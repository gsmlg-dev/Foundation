import fs from 'fs'
import path from 'path'

import Head from 'next/head';
import { makeStyles } from '@material-ui/styles';

import ReactMarkdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import gfm from 'remark-gfm'

import Layout from 'components/Layout';

import blogList from 'blogList';

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
  content: string | null;
}

export default function Blog({ blog }) {
  const classes = useStyles();

  return (
    <Layout menus={menus}>
      <Head>
        <title>{blog && blog.title}</title>
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
          <ReactMarkdown plugins={[gfm]}>{blog.content}</ReactMarkdown>
        </Typography>
      </Paper>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paramsList = blogList.map(({ name }) => ({
    params: { slug: name },
  }));

  return {
    paths: paramsList,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const blog = blogList.find((b) => b.name === slug);
  const blogDir = path.join(process.cwd(), 'data/blogs');
  const blogPath = `${blogDir}/${slug}.md`;
  const content = fs.readFileSync(blogPath, { encoding: 'utf-8', flag: 'r' });

  return {
    props: {
      slug,
      blog: {
        ...blog,
        content,
      },
    },
  }
}
