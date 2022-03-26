/**
 *
 * Layout
 *
 */
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { css } from '@emotion/react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Link from 'next/link';

import { useSocket } from 'phoenix-provider';

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
    theme,
  }
) => ({
  // height: '2em',
  lineHeight: '2em',
  textAlign: 'center',
  marginTop: '0.5em',
  color: theme.palette.getContrastText(theme.palette.primary.main),
  backgroundColor: theme.palette.primary.main,
}));

const SocketStatus = styled('div')(({ theme, status }) => ({
  display: 'inline-block',
  width: 16,
  height: 16,
  borderRadius: 8,
  margin: '0 8px',
  backgroundColor: status.color,
}));

const menus = [
  {name: 'Home', href: '/'},
  {name: 'Blog', href: '/blogs'},
  {name: 'Presentation', href: '/presentations'},
  {name: 'Tool', href: '/tools'},
  {name: 'Game', href: '/games'},
];

const Layout = ({children}, ref) => {
  const [isCN, setIsCN] = React.useState(true);
  React.useEffect(() => {
    setIsCN(window.location.hostname === 'www.gsmlg.cn');
  }, []);
  const socket = useSocket();
  const [socketStatus, setSocketStatus] = React.useState({ color: 'transperant' });
  React.useEffect(() => {
    if (socket) {
      const updateState = () => {
        const state = socket.connectionState();
        switch(state) {
          case "connecting":
            setSocketStatus({ color: '#ff0' });
            break;
          case "open":
            setSocketStatus({ color: '#0f0' });
            break;
          case "closing":
            setSocketStatus({ color: '#0ff' });
            break;
          default:
            // "closed"
            setSocketStatus({ color: '#f00' });
        }
      };
      updateState();
      const list = [
        socket.onOpen(updateState),
        socket.onClose(updateState),
        socket.onError(updateState),
        socket.onMessage(updateState),
      ];
      return () => {
        socket.off(list);
      };
    }
  }, [socket]);

  const requestPerm = React.useCallback(() => {
    Notification.requestPermission();
  }, []);

  return (
    <RootSection ref={ref}>
      <AppBar position="static">
        <Toolbar>
          <SocketStatus status={socketStatus} />
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
      <Footer style={{ marginTop: 0 }}>
        <div className="container">
          <span
            id={'icp-info'}
            css={css`
              margin: 0 2em;
              display: ${isCN ? 'inline' : 'none'}
            `}
          >
            京ICP备20014476号-2
          </span>
          <span>
            Copyright © 2017-2022 GSMLG - Powered by GSMLG Web.
          </span>
        </div>
      </Footer>
    </RootSection>
  );
};

export default React.forwardRef(Layout);
