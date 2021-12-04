import { readFile } from 'fs/promises';
import * as path from 'path';
import * as React from 'react';

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
import 'lowlight/lib/all.js';
import mermaid from 'mermaid';

import Layout from 'components/Layout';

import { usePrefersColorScheme } from '@gsmlg/react/dist/hooks/usePrefersColorScheme';

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
  const ref : React.MutableRefObject<HTMLElement> = React.useRef();
  const colorScheme = usePrefersColorScheme();
  const cssString = colorScheme === 'dark' ? darkCss : lightCss;
  const isDark = colorScheme === 'dark';

  React.useEffect(() => {
    mermaid.initialize({
      theme: isDark ? 'dark' : 'default',
      startOnLoad: false,
    });
  }, [isDark]);
  React.useEffect(() => {
    if (ref.current) {
      const decodeEntities = (txt: string) : string => {
        return txt
          .replace('&gt;', '>')
          .replace('&lt;', '<');
      }
      const els : NodeListOf<HTMLElement> = ref.current.querySelectorAll('code.language-mermaid');
      const wrap = document.createElement('div');
      document.body.appendChild(wrap);
      wrap.style.display='none';
      wrap.id = 'mermaid-wrap';
      for (let i = 0, len = els.length; i < len; i += 1) {
        const box = document.createElement('div');
        box.id = `mermaid-${i}`;
        wrap.appendChild(box);
        const el = els[i];
        const txt = el.innerText;
        const cb = function cb(svgGraph: string){
          el.innerHTML = svgGraph;
        };
        mermaid.mermaidAPI.render(`mermaid-${i}`, decodeEntities(txt), cb);
      }
      document.body.removeChild(wrap);
    }
  }, [ref]);

  return (
    <Layout>
      <Head>
        <title>{blog && blog.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper 
        elevation={4}
        css={(theme: Theme) => ({
          flex: 1,
          padding: theme.spacing(3),
          margin: theme.spacing(3),
        })}
      >
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
        <Typography className="blog-content" component="section" ref={ref}>
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
      </Paper>
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

export async function getStaticProps({params: { slug }}) {
  const { default: blogList } = await import('../../data/blogs.json');
  const blog : BlogStruct = blogList.find((b) => b.slug === slug);

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
