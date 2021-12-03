import { readFile } from 'fs/promises';
import * as path from 'path';
import { styled } from '@mui/material/styles';

import Head from 'next/head';
import getConfig from 'next/config';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import Layout from 'components/Layout';

import { usePrefersColorScheme } from '@gsmlg/react/dist/hooks/usePrefersColorScheme';

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
  slug: string;
  date: string;
  content?: string | null;
}

import 'highlight.js/styles/github.css';

function Blog({blog, darkCss, lightCss }) {
  const colorScheme = usePrefersColorScheme();
  const cssString = colorScheme === 'dark' ? darkCss : lightCss;

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
          <ReactMarkdown
            css={css`
              ${cssString}
            `}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
          >
            {blog.content}
          </ReactMarkdown>
        </Typography>
      </PagePaper>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { default: blogList } = await import('../../data/blogs.json');

  const paramsList = blogList.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths: paramsList,
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const {slug} = params;

  const { default: blogList } = await import('../../data/blogs.json');
  const blog = blogList.find((b) => b.slug === slug);

  const {serverRuntimeConfig} = getConfig();
  const lightCss = await readFile(path.join(serverRuntimeConfig.PROJECT_ROOT, 'node_modules/highlight.js/styles/atom-one-light.css'));
  const darkCss = await readFile(path.join(serverRuntimeConfig.PROJECT_ROOT,'node_modules/highlight.js/styles/atom-one-dark.css'));

  return {
    props: {
      slug,
      blog,
      lightCss: lightCss.toString(),
      darkCss: darkCss.toString(),
    },
  };
}

export default Blog;
