import * as React from 'react';
import {Socket, Presence, Channel} from 'phoenix';

const PhoenixContext = React.createContext({});

PhoenixContext.displayName = 'Phoenix';

export interface ProviderArgs {
    url: string;
    params?: object;
    children: JSX.Element
};

export function Provider(arg : ProviderArgs) : JSX.Element;

export const Consumer: PhoenixContext.Consumer;

export function useSocket() : Socket | null;

export function useChannel(topic: string, params?: object) : Channel | null;

export function usePresence(topic: string) : Presence | null;

