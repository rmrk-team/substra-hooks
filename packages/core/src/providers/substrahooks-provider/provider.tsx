import React, { ReactNode, useEffect, useReducer } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import {
  ApiProviders,
  initialBalancesState,
  initialProvidersState,
  ProvidersState,
  SubstraHooksContext,
} from './context';
import {
  fetchSystemProperties,
  systemPropertiesDefaults,
} from '../../helpers/fetch-system-properties';
import { useIsMountedRef } from '../../helpers/use-is-mounted-ref';
import { RegistryTypes } from '@polkadot/types/types';
import { balancesReducer } from '../../state/balances';
import { ErrorActionTypes, errorsReducer } from '../../state/errors';
import { initialErrorsState } from '.';
import { ProvidersActions, providersReducer, Types } from './reducer';

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
  apiProvidersState: ProvidersState,
  apiProvidersStateDispatch: React.Dispatch<ProvidersActions>,
  types?: RegistryTypes,
) => {
  if (
    apiProvidersState.apiProviders[id] &&
    apiProvidersState.apiProviders[id]?.rpcEndpoint === wsProviderUrl
  ) {
    return apiProvidersState.apiProviders[id];
  }

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
    apiProvidersStateDispatch({
      type: Types.SET_PROVIDER,
      payload: {
        id,
        provider: {
          systemProperties,
          apiProvider: polkadotApi,
          wsProvider,
          rpcEndpoint: wsProviderUrl,
        },
      },
    });
  } catch (error: any) {
    console.warn(`RPC ${wsProviderUrl} has failed with an error`, error);
  }

  apiProvidersStateDispatch({
    type: Types.SET_PROVIDER,
    payload: {
      id,
      provider: {
        ...apiProvidersState.apiProviders[id],
        systemProperties,
        apiProvider: polkadotApi,
        rpcEndpoint: wsProviderUrl,
      },
    },
  });

  return apiProvidersState.apiProviders[id];
};

const initAllApis = async (
  apiProviderConfig: ApiProviderConfig,
  apiProvidersState: ProvidersState,
  apiProvidersStateDispatch: React.Dispatch<ProvidersActions>,
) => {
  return await Promise.all(
    Object.keys(apiProviderConfig).map(async (configId) =>
      initPolkadotPromise(
        apiProviderConfig[configId].id,
        apiProviderConfig[configId].wsProviderUrl,
        apiProvidersState,
        apiProvidersStateDispatch,
        apiProviderConfig[configId].types,
      ),
    ),
  );
};

export const SubstraHooksProvider = ({
  children,
  apiProviderConfig,
  defaultApiProviderId,
}: ISubstraHooksProviderProps) => {
  const [errorsState, errorsDispatch] = useReducer(errorsReducer, initialErrorsState);
  const [balancesState, balancesDispatch] = useReducer(balancesReducer, initialBalancesState);
  const [apiProvidersState, apiProvidersStateDispatch] = useReducer(
    providersReducer,
    initialProvidersState,
  );
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    if (apiProviderConfig && isMountedRef.current) {
      const initApisPromise = async () => {
        await initAllApis(apiProviderConfig, apiProvidersState, apiProvidersStateDispatch);
      };

      initApisPromise();
    }
  }, [JSON.stringify(apiProviderConfig), isMountedRef]);

  useEffect(() => {
    if (Object.keys(apiProvidersState.apiProviders).length > 0) {
      Object.keys(apiProvidersState.apiProviders).map((apiProviderId) => {
        const wsProvider = apiProvidersState.apiProviders[apiProviderId].wsProvider;
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
    }
  }, [
    JSON.stringify(apiProvidersState.apiProviders?.provider?.rpcEndpoint),
    JSON.stringify(apiProvidersState.apiProviders?.provider?.systemProperties),
    isMountedRef,
  ]);

  return (
    <SubstraHooksContext.Provider
      value={{
        apiProvidersState,
        apiProvidersStateDispatch,
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
