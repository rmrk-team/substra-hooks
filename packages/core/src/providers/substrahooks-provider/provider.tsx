import React, { ReactNode, useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ApiProviders, SubstraHooksContext } from './context';
import { fetchSystemProperties } from '../../helpers/fetch-system-properties';
import { ExtensionProvider } from '../extension';
import { useIsMountedRef } from '../../helpers/use-is-mounted-ref';

const apiProviders: ApiProviders = {};

export type ApiProviderConfig = Record<string, { id: string; wsProviderUrl: string }>;

interface ISubstraHooksProviderProps {
  apiProviderConfig: ApiProviderConfig | null;
  defaultApiProviderId: string;
  autoInitialiseExtension?: boolean;
  children: ReactNode;
}

export const initPolkadotPromise = async (id: string, wsProviderUrl: string) => {
  if (apiProviders[id]) return apiProviders[id];
  const wsProvider = new WsProvider(wsProviderUrl);
  const polkadotApi = await ApiPromise.create({ provider: wsProvider });
  await polkadotApi.isReady;
  const systemProperties = await fetchSystemProperties(polkadotApi);
  apiProviders[id] = {
    systemProperties,
    apiProvider: polkadotApi,
  };
  return apiProviders[id];
};

const initAllApis = async (apiProviderConfig: ApiProviderConfig) => {
  return Promise.all(
    Object.keys(apiProviderConfig).map(async (configId) =>
      initPolkadotPromise(
        apiProviderConfig[configId].id,
        apiProviderConfig[configId].wsProviderUrl,
      ),
    ),
  );
};

export const createSubstraHooksProvider = () => {
  const SubstraHooksProvider = ({
    children,
    apiProviderConfig,
    defaultApiProviderId,
    autoInitialiseExtension,
  }: ISubstraHooksProviderProps) => {
    const isMountedRef = useIsMountedRef();
    const [apiInitialised, setApiInitialised] = useState(false);

    useEffect(() => {
      if (apiProviderConfig && !apiInitialised) {
        initAllApis(apiProviderConfig).then((_apiProviders) => {
          if (isMountedRef.current) {
            setApiInitialised(true);
          }
        });
      }
    }, [apiProviderConfig, apiInitialised, isMountedRef]);

    return (
      <SubstraHooksContext.Provider value={{ apiProviders, defaultApiProviderId }}>
        <ExtensionProvider autoInitialiseExtension={autoInitialiseExtension}>
          {children}
        </ExtensionProvider>
      </SubstraHooksContext.Provider>
    );
  };

  return SubstraHooksProvider;
};

export const SubstraHooksProvider = createSubstraHooksProvider();
