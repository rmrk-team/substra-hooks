import { createContext, Dispatch, useContext } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ISystemProperties } from '../../types/system-properties';
import { BalancesActions, BalancesState } from '../../state/balances';
import { ErrorsActions, ErrorsState } from '../../state/errors';
import { ProvidersActions } from './reducer';


export type ApiProvider = {
  apiProvider: ApiPromise | null;
  systemProperties: ISystemProperties;
  wsProvider?: WsProvider;
  rpcEndpoint?: string
};
export type ApiProviders = Record<string, ApiProvider>;

export interface ProvidersState {
  apiProviders: ApiProviders;
}

export const initialProvidersState: ProvidersState = {
  apiProviders: {}
};

export const initialErrorsState: ErrorsState = {
  blockSyncErrors: {},
};

export const initialBalancesState: BalancesState = {
  balances: {},
  assets: {},
};

export const SubstraHooksContext = createContext<{
  apiProvidersState: ProvidersState;
  apiProvidersStateDispatch: Dispatch<ProvidersActions>;
  defaultApiProviderId: string;
  balancesState: BalancesState;
  balancesDispatch: Dispatch<BalancesActions>;
  errorsState: ErrorsState;
  errorsDispatch: Dispatch<ErrorsActions>;
}>({
  apiProvidersState: initialProvidersState,
  apiProvidersStateDispatch: () => null,
  defaultApiProviderId: '',
  errorsState: initialErrorsState,
  errorsDispatch: () => null,
  balancesState: initialBalancesState,
  balancesDispatch: () => null,
});

export const useSubstraHooksState = () => {
  return useContext(SubstraHooksContext);
};

export const useBalancesState = () => {
  return useContext(SubstraHooksContext).balancesState;
};

export const useApiProvidersState = () => {
  return useContext(SubstraHooksContext).apiProvidersState;
};
