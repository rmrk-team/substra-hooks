import { createContext, useContext } from 'react';
import { ApiPromise } from '@polkadot/api';
import { ISystemProperties } from '../../types/system-properties';

export type ApiProvider = { apiProvider: ApiPromise | null; systemProperties: ISystemProperties };
export type ApiProviders = Record<string, ApiProvider>;

export const SubstraHooksContext = createContext<{
  apiProviders: ApiProviders;
  defaultApiProviderId: string;
}>({
  apiProviders: {},
  defaultApiProviderId: '',
});

export function useSubstraHooksState() {
  return useContext(SubstraHooksContext);
}
