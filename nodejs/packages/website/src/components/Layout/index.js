/**
 *
 * Layout
 *
 */

import * as React from 'react';
import { styled } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Link from 'next/link';

const RootSection = styled('section')((
  {
    theme
  }
) => ({
  display: 'flex',
  minHeight: '100vh',
  // width: '100vw',
  flexDirection: 'column',
  flex: '1 1 auto',
}));
const ContainerSection = styled('section')((
  {
    theme
  }
) => ({
  display: 'flex',
  flex: '1 1 auto',
}));
const Footer = styled('footer')((
  {
    theme
  }
) => ({
  // height: '2em',
  lineHeight: '2em',
  textAlign: 'center',
  marginTop: '0.5em',
  color: theme.palette.getContrastText(theme.palette.primary.main),
  backgroundColor: theme.palette.primary.main,
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
    <RootSection ref={ref}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={requestPerm}
            color="inherit"
            aria-label="Menu"
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit">
            {menus.map(({name, href}) => (
              <Button key={name} color="inherit">
                <Link href={href}>{name}</Link>
              </Button>
            ))}
          </Typography>
        </Toolbar>
      </AppBar>
      <ContainerSection>
        {children}
      </ContainerSection>
      <Footer>
        <div className="container">
          <span>
            Copyright © 2017-2021 GSMLG - Powered by GSMLG Web.
          </span>
        </div>
      </Footer>
    </RootSection>
  );
};

export default React.forwardRef(Layout);
