/**
 *
 * Presentation
 *
 */

import React, {memo} from 'react';

import { styled } from '@mui/material/styles';

import Head from 'next/head';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoteIcon from '@mui/icons-material/Note';

import Layout from 'components/Layout';

const PagePaper = styled(Paper)(({
  theme
}) => ({
  flex: 1,
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));

interface Props {}

const Presentation = memo((props: Props) => {

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
  ]
    .slice()
    .reverse();

  return (
    <Layout>
      <Head>
        <title>Presentation</title>
        <meta name="description" content="Description of Presentation" />
      </Head>
      <PagePaper>
        <List>
          {noteList.map((note) => (
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
      </PagePaper>
    </Layout>
  );
});

export default Presentation;
