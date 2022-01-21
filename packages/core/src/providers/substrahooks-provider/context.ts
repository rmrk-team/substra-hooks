import { createContext, Dispatch, useContext } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ISystemProperties } from '../../types/system-properties';
import { BalancesActions, BalancesState } from '../../state/balances';
import { ErrorsActions, ErrorsState } from '../../state/errors';

export type ApiProvider = {
  apiProvider: ApiPromise | null;
  systemProperties: ISystemProperties;
  wsProvider?: WsProvider;
};
export type ApiProviders = Record<string, ApiProvider>;

export const initialErrorsState: ErrorsState = {
  blockSyncErrors: {},
};

export const initialBalancesState: BalancesState = {
  balances: {},
  assets: {},
};

export const SubstraHooksContext = createContext<{
  apiProviders: ApiProviders;
  defaultApiProviderId: string;
  balancesState: BalancesState;
  balancesDispatch: Dispatch<BalancesActions>;
  errorsState: ErrorsState;
  errorsDispatch: Dispatch<ErrorsActions>;
}>({
  apiProviders: {},
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
