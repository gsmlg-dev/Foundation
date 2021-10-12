/**
 *
 * Layout
 *
 */

import React from 'react';
import { styled } from '@mui/material/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Link from 'next/link';

const PREFIX = 'index';

const classes = {
  root: `${PREFIX}-root`,
  flex: `${PREFIX}-flex`,
  footer: `${PREFIX}-footer`,
  menuButton: `${PREFIX}-menuButton`,
  raised: `${PREFIX}-raised`,
  icp: `${PREFIX}-icp`,
  copyright: `${PREFIX}-copyright`
};

const Root = styled('section')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    minHeight: '100vh',
    width: '100vw',
    flexDirection: 'column',
    flex: '1 1 auto',
  },

  [`& .${classes.flex}`]: {
    display: 'flex',
    flex: 1,
  },

  [`& .${classes.footer}`]: {
    // height: '2em',
    lineHeight: '2em',
    textAlign: 'center',
    marginTop: '0.5em',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },

  [`& .${classes.menuButton}`]: {
    marginLeft: -12,
    marginRight: 20,
  },

  [`& .${classes.raised}`]: {},

  [`& .${classes.icp}`]: {
    fontWeight: 'bold',
    marginRight: 20,
    marginLeft: 20,
  },

  [`& .${classes.copyright}`]: {}
}));

const menus = [
  {name: 'Home', href: '/'},
  {name: 'Blog', href: '/blogs'},
  {name: 'Presentation', href: '/presentations'},
  {name: 'Tool', href: '/tools'},
  {name: 'Game', href: '/games'},
];

const Layout = ({children}, ref) => {

  const requestPerm = React.useCallback(() => {
    Notification.requestPermission();
  }, []);

  return (
    <Root className={classes.root} ref={ref}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={requestPerm}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            {menus.map(({name, href}) => (
              <Button key={name} color="inherit">
                <Link href={href}>{name}</Link>
              </Button>
            ))}
          </Typography>
        </Toolbar>
      </AppBar>
      <section className={classes.flex}>{children}</section>
      <footer className={classes.footer}>
        <div className="container">
          {/* {window.location.hostname.includes('gsmiot.com') ? (
            <>
              <span className={classes.icp}>京ICP备20014476号</span>
            </>
          ) : null} */}
          <span className={classes.copyright}>
            Copyright © 2017-2021 GSMLG - Powered by GSMLG Web.
          </span>
        </div>
      </footer>
    </Root>
  );
};

export default React.forwardRef(Layout);
