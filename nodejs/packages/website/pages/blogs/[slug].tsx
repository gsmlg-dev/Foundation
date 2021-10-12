import fs from 'fs';
import { styled } from '@mui/material/styles';
import path from 'path';

import Head from 'next/head';

import ReactMarkdown from 'react-markdown';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import gfm from 'remark-gfm';

import Layout from 'components/Layout';

import blogList from 'blogList';

const PagePaper = styled(Paper)(({
  theme
}) => ({
  flex: 1,
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));

interface BlogStruct {
  id: number;
  author: string;
  title: string;
  name: string;
  date: string;
  content: string | null;
}

export default function Blog({blog}) {

  return (
    <Layout>
      <Head>
        <title>{blog && blog.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PagePaper elevation={4}>
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
      </PagePaper>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paramsList = blogList.map(({name}) => ({
    params: {slug: name},
  }));

  return {
    paths: paramsList,
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const {slug} = params;
  const blog = blogList.find((b) => b.name === slug);
  const blogDir = path.join(process.cwd(), 'data/blogs');
  const blogPath = `${blogDir}/${slug}.md`;
  const content = fs.readFileSync(blogPath, {encoding: 'utf-8', flag: 'r'});

  return {
    props: {
      slug,
      blog: {
        ...blog,
        content,
      },
    },
  };
}
