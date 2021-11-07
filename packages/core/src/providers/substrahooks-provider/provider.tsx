import React, { ReactNode, useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { SubstraHooksContext } from './context';
import { ISystemProperties } from '../../types/system-properties';
import { fetchSystemProperties } from '../../helpers/fetch-system-properties';
import { ExtensionProvider } from '../extension';
import { useIsMountedRef } from '../../helpers/use-is-mounted-ref';

let wsProvider: WsProvider;
let polkadotApi: ApiPromise;

interface ISubstraHooksProviderProps {
  wsProviderUrl: string;
  autoInitialise?: boolean;
  children: ReactNode;
}

export const initPolkadotPromise = async (wsProviderUrl: string) => {
  if (wsProvider && polkadotApi) return { wsProvider, polkadotApi };
  wsProvider = new WsProvider(wsProviderUrl);
  polkadotApi = await ApiPromise.create({ provider: wsProvider });
  await polkadotApi.isReady;
  return { wsProvider, polkadotApi };
};

export const createSubstraHooksProvider = () => {
  const SubstraHooksProvider = ({
    children,
    wsProviderUrl,
    autoInitialise,
  }: ISubstraHooksProviderProps) => {
    const isMountedRef = useIsMountedRef();
    const [api, setApi] = useState<ApiPromise | null>(null);
    const [systemProperties, setSystemProperties] = useState<ISystemProperties | null>(null);

    useEffect(() => {
      if (wsProviderUrl && !api) {
        initPolkadotPromise(wsProviderUrl).then(({ polkadotApi }) => {
          if (isMountedRef.current) {
            setApi(polkadotApi);
          }
        });
      }
    }, [wsProviderUrl, api, isMountedRef]);

    useEffect(() => {
      if (api && !systemProperties) {
        fetchSystemProperties(api).then((newSystemProperties) => {
          if (isMountedRef.current) {
            setSystemProperties(newSystemProperties);
          }
        });
      }
    }, [api, systemProperties, isMountedRef]);

    return (
      <SubstraHooksContext.Provider value={{ apiProvider: api, systemProperties }}>
        <ExtensionProvider autoInitialise={autoInitialise}>{children}</ExtensionProvider>
      </SubstraHooksContext.Provider>
    );
  };

  return SubstraHooksProvider;
};

export const SubstraHooksProvider = createSubstraHooksProvider();
