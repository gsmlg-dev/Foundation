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

import blogList from 'blogList';

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

export default function BlogList({blogs = [], ...props}) {

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
              <StyledListItem key={blog.name}>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link href={`/blogs/${blog.name}`}>{blog.title}</Link>
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
  return {
    props: {
      blogs: blogList,
    }, // will be passed to the page component as props
  };
}
