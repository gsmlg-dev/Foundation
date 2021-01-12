/**
 *
 * Presentation
 *
 */

import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';

import Head from 'next/head';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteIcon from '@material-ui/icons/Note';

import Layout from 'components/Layout';

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

interface Props { }

const Presentation = memo((props: Props) => {
  const classes = useStyles();
  const noteList = [
    {
      id: 1,
      name: 'BIG WEB APP? COMPILE IT!',
      author: 'ALON ZAKAI / MOZILLA',
      link: 'https://kripken.github.io/mloc_emscripten_talk',
    },
    {
      id: 2,
      name: 'Debug in Webpack',
      author: 'gsmlg',
      link: 'https://gsmlg.github.io/Reveal/debug-module/',
    },
    {
      id: 3,
      name: 'Promise A Plus',
      author: 'gsmlg',
      link: 'https://gsmlg.github.io/Reveal/promise-a-plus/dist/',
    },
    {
      id: 4,
      name: 'Dynamic Import',
      author: 'gsmlg',
      link: 'https://gsmlg.github.io/Reveal/dynamic-import/dist/',
    },
  ].slice().reverse();

  return (
    <Layout>
      <Head>
        <title>Presentation</title>
        <meta name="description" content="Description of Presentation" />
      </Head>
      <Paper className={classes.root}>
        <List>
          {noteList.map(note => (
            <ListItem
              key={note.name}
              component="a"
              href={note.link}
              target="_blank"
            >
              <ListItemIcon>
                <NoteIcon />
              </ListItemIcon>
              <ListItemText primary={note.name} />
              <ListItemText secondary={note.author} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Layout>
  );
});

export default Presentation;
