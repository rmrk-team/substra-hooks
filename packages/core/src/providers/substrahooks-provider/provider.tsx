import React, { ReactNode, useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { SubstraHooksContext } from './context';
import { ISystemProperties } from '../../types/system-properties';
import { fetchSystemProperties } from '../../helpers/fetch-system-properties';

let wsProvider: WsProvider;
let polkadotApi: ApiPromise;

interface ISubstraHooksProviderProps {
  wsProviderUrl: string;
  children: ReactNode;
}

export const initPolkadotPromise = async (wsProviderUrl: string) => {
  if (wsProvider && polkadotApi) return { wsProvider, polkadotApi };
  wsProvider = new WsProvider(wsProviderUrl);
  polkadotApi = await ApiPromise.create({ provider: wsProvider });
  await polkadotApi.isReady;
  return { wsProvider, polkadotApi };
};

const fetchSystemPropertiesAndSet = async (
  api: ApiPromise,
  setSystemProperties: (systemProperties: ISystemProperties) => void,
) => {
  const systemProperties = await fetchSystemProperties(api);
  setSystemProperties(systemProperties);
};

export const createSubstraHooksProvider = () => {
  const SubstraHooksProvider = ({ children, wsProviderUrl }: ISubstraHooksProviderProps) => {
    const [api, setApi] = useState<ApiPromise | null>(null);
    const [systemProperties, setSystemProperties] = useState<ISystemProperties | null>(null);

    const initAndSetApi = async (wsProviderUrl: string) => {
      const { polkadotApi } = await initPolkadotPromise(wsProviderUrl);
      setApi(polkadotApi);
    };

    useEffect(() => {
      if (wsProviderUrl && !api) {
        initAndSetApi(wsProviderUrl);
      }
    }, [wsProviderUrl]);

    useEffect(() => {
      if (api) {
        fetchSystemPropertiesAndSet(api, setSystemProperties);
      }
    }, [api]);

    return (
      <SubstraHooksContext.Provider
        value={{ apiProvider: api, systemProperties }}
        children={children}
      />
    );
  };

  return SubstraHooksProvider;
};

export const SubstraHooksProvider = createSubstraHooksProvider();
