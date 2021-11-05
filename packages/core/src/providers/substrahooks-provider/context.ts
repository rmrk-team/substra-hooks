import { createContext, useContext } from 'react';
import { ApiPromise } from '@polkadot/api';
import {ISystemProperties} from "../../types/system-properties";

export const SubstraHooksContext = createContext<{
  apiProvider: ApiPromise | null;
  systemProperties: ISystemProperties | null;
}>({
  apiProvider: null,
  systemProperties: null
});

export function useSubstraHooksState() {
  return useContext(SubstraHooksContext);
}
