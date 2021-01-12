import Head from 'next/head';
import { makeStyles } from '@material-ui/styles';

import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WebIcon from '@material-ui/icons/Web';

import Layout from 'components/Layout';

import blogList from 'blogList';

const useStyles = makeStyles((theme: any) => ({
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

export default function BlogList({ blogs = [], ...props }) {
  const classes = useStyles();

  return (
    <Layout>
      <Head>
        <title>Blog List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper className={classes.root} elevation={4}>
        <List>
          {blogs.map((blog): JSX.Element => (
            <ListItem
              key={blog.name}
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

export async function getStaticProps(context) {

  return {
    props: {
      blogs: blogList,
    }, // will be passed to the page component as props
  }
}
