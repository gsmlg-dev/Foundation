import * as React from 'react';
import { Socket, Channel, Presence, SocketConnectOption } from 'phoenix';

export interface PhoenixContentState {
  socket: Socket | null;
  setSocket?: (s: Socket) => void;
}

const PhoenixContext = React.createContext<PhoenixContentState>({ socket: null });

interface ProviderProps {
  url: string;
  options?: SocketConnectOption;
  children?: React.ReactChild | React.ReactChildren;
}

export const Provider: React.FC<ProviderProps> = ({
  url = '/socket',
  options,
  children,
}) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  React.useEffect(() => {
    const _socket = new Socket(url, options);
    _socket.connect();
    setSocket(_socket);
  }, [url, options]);

  return React.createElement(
    PhoenixContext.Provider,
    {
      value: {
        socket,
        setSocket,
      },
    },
    children,
  );
};
Provider.displayName = 'PhoenixProvider';

export const Consumer = PhoenixContext.Consumer;

export const useSocket = () => {
  const ctx = React.useContext(PhoenixContext);
  const { socket } = ctx;

  return socket;
};

export const useChannel = (topic: string, params?: object | (() => object)) => {
  const socket = useSocket();
  if (!socket) return null;
  const _channel = socket.channels.find((c: Channel) => c.topic === topic);
  const channel = _channel ? _channel : socket.channel(topic, params);

  return channel;
};

export const usePresence = (topic: string) => {
  const channel = useChannel(topic);
  const presence = React.useMemo(() => {
    if (!channel) return null;
    return new Presence(channel);
  }, [topic, channel]);

  return presence;
};
