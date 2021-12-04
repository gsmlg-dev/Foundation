import Head from 'next/head';
import { styled } from '@mui/material/styles';

import Link from 'next/link';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WebIcon from '@mui/icons-material/Web';

import Layout from 'components/Layout';

const PagePaper = styled(Paper)(({
  theme
}) => ({
  flex: 1,
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));
const StyledListItem = styled(ListItem)(({
  theme
}) => ({
  transition: 'all 1s',
  '&:hover': {
    boxShadow: `0 0 4px 4px ${theme.palette.primary.main}`,
  },
}));

function BlogList({blogs = []}) {

  return (
    <Layout>
      <Head>
        <title>Blog List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PagePaper elevation={4}>
        <List>
          {blogs.map(
            (blog): JSX.Element => (
              <StyledListItem key={blog.slug}>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                  }
                />
                <ListItemText secondary={blog.date} />
              </StyledListItem>
            )
          )}
        </List>
      </PagePaper>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { default: blogList } = await import('../../data/blogs.json');

  const blogs = blogList.slice().sort((a, b) => a.id > b.id ? -1 : 1).map((b) => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    date: b.date,
    author: b.author,
  }));
  
  return {
    props: {
      blogs,
    }, // will be passed to the page component as props
  };
}

export default BlogList;
