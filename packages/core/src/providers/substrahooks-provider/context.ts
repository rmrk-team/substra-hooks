import { createContext, Dispatch, useContext } from 'react';
import { ApiPromise } from '@polkadot/api';
import { ISystemProperties } from '../../types/system-properties';
import { BalanceReturnType } from '../../helpers';
import { BalancesActions } from './reducer';

export type ApiProvider = { apiProvider: ApiPromise | null; systemProperties: ISystemProperties };
export type ApiProviders = Record<string, ApiProvider>;

export interface BalancesState {
  balances: Record<string, BalanceReturnType>;
  assets: Record<string, Record<string, BalanceReturnType>>;
}

export const initialBalancesState: BalancesState = {
  balances: {},
  assets: {}
};

export const SubstraHooksContext = createContext<{
  apiProviders: ApiProviders;
  defaultApiProviderId: string;
  balancesState: BalancesState;
  balancesDispatch: Dispatch<BalancesActions>;
}>({
  apiProviders: {},
  defaultApiProviderId: '',
  balancesState: initialBalancesState,
  balancesDispatch: () => null,
});

export const useSubstraHooksState = () => {
  return useContext(SubstraHooksContext);
};

export const useBalancesState = () => {
  return useContext(SubstraHooksContext).balancesState;
};
