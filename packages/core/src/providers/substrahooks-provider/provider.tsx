import React, { ReactNode, useEffect, useReducer, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ApiProviders, initialBalancesState, SubstraHooksContext } from './context';
import {
  fetchSystemProperties,
  systemPropertiesDefaults,
} from '../../helpers/fetch-system-properties';
import { useIsMountedRef } from '../../helpers/use-is-mounted-ref';
import { RegistryTypes } from '@polkadot/types/types';
import { balancesReducer } from '../../state/balances';
import { ErrorActionTypes, errorsReducer } from '../../state/errors';
import { initialErrorsState } from '.';

const _apiProviders: ApiProviders = {};

export type ApiProviderConfig = Record<
  string,
  { id: string; wsProviderUrl: string; types?: RegistryTypes }
>;

interface ISubstraHooksProviderProps {
  apiProviderConfig: ApiProviderConfig | null;
  defaultApiProviderId: string;
  autoInitialiseExtension?: boolean;
  children: ReactNode;
}

export const initPolkadotPromise = async (
  id: string,
  wsProviderUrl: string,
  types?: RegistryTypes,
) => {
  if (_apiProviders[id]) return _apiProviders[id];
  let polkadotApi = null;
  let systemProperties = systemPropertiesDefaults;
  try {
    const wsProvider = new WsProvider(wsProviderUrl);
    polkadotApi = await ApiPromise.create({
      provider: wsProvider,
      types: types,
      throwOnConnect: true,
    });
    await polkadotApi.isReady;
    systemProperties = await fetchSystemProperties(polkadotApi);
    _apiProviders[id] = {
      systemProperties,
      apiProvider: polkadotApi,
      wsProvider,
    };
  } catch (error: any) {
    console.warn(`RPC ${wsProviderUrl} has failed with an error`, error);
  }

  _apiProviders[id] = {
    ..._apiProviders[id],
    systemProperties,
    apiProvider: polkadotApi,
  };
  return _apiProviders[id];
};

const initAllApis = async (apiProviderConfig: ApiProviderConfig) => {
  await Promise.all(
    Object.keys(apiProviderConfig).map(async (configId) =>
      initPolkadotPromise(
        apiProviderConfig[configId].id,
        apiProviderConfig[configId].wsProviderUrl,
        apiProviderConfig[configId].types,
      ),
    ),
  );
  return _apiProviders;
};

export const SubstraHooksProvider = ({
  children,
  apiProviderConfig,
  defaultApiProviderId,
}: ISubstraHooksProviderProps) => {
  const [apiProviders, setApiProviders] = useState<ApiProviders>({});
  const [errorsState, errorsDispatch] = useReducer(errorsReducer, initialErrorsState);
  const [balancesState, balancesDispatch] = useReducer(balancesReducer, initialBalancesState);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    if (apiProviderConfig) {
      initAllApis(apiProviderConfig).then((apiProviders) => {
        if (isMountedRef.current) {
          setApiProviders(apiProviders);
        }
        Object.keys(apiProviders).map((apiProviderId) => {
          const wsProvider = apiProviders[apiProviderId].wsProvider;
          const errorHandler = (error: Error | string) => {
            errorsDispatch({
              type: ErrorActionTypes.BLOCK_SYNC_ERROR,
              payload: {
                network: apiProviderId,
                error: typeof error === 'string' ? new Error(error) : error,
              },
            });
          };
          const connectedHandler = () => {
            errorsDispatch({
              type: ErrorActionTypes.BLOCK_SYNC_ERROR,
              payload: {
                network: apiProviderId,
                error: undefined,
              },
            });
          };
          wsProvider?.on('error', errorHandler);
          wsProvider?.on('connected', connectedHandler);
        });
      });
    }
  }, [JSON.stringify(apiProviderConfig), isMountedRef]);

  return (
    <SubstraHooksContext.Provider
      value={{
        apiProviders,
        defaultApiProviderId,
        errorsState,
        errorsDispatch,
        balancesState,
        balancesDispatch,
      }}>
      {children}
    </SubstraHooksContext.Provider>
  );
};
