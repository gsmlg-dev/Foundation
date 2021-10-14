import * as React from 'react';
import {Socket, Presence} from 'phoenix';

const PhoenixContext = React.createContext({});

PhoenixContext.displayName = 'Phoenix';

export const Provider = ({url = '/socket', params = {}, children}) => {
  const [socket, setSocket] = React.useState({});
  React.useEffect(() => {
    const socket = new Socket(url, {params});
    socket.connect();
    setSocket(socket);
  }, []);

  return (
    <PhoenixContext.Provider value={{socket, setSocket}}>
      {children}
    </PhoenixContext.Provider>
  );
};

export const Consumer = PhoenixContext.Consumer;

export const useSocket = () => {
  const ctx = React.useContext(PhoenixContext);
  const {socket} = ctx;

  return socket;
};

export const useChannel = (topic, params = {}) => {
  const socket = useSocket();
  const channel = socket.channel(topic, params);

  return channel;
};

export const usePresence = (topic) => {
  const presence = React.useMemo(() => {
    const channel = useChannel(topic);
    return new Presence(channel);
  }, [topic]);

  return presence;
};
