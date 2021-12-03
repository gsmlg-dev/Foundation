import { styled } from '@mui/material/styles';

import Head from 'next/head';
import dynamic from 'next/dynamic'

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import Layout from 'components/Layout';


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

function Blog({blog}) {

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

  return {
    props: {
      slug,
      blog,
    },
  };
}

export default Blog;
