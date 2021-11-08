import { useContext } from 'react';
import { SubstraHooksContext } from '../providers/substrahooks-provider/context';
import { ApiPromise } from '@polkadot/api';

export const useApiProvider = (apiProviderId?: string): ApiPromise | null => {
  const id = apiProviderId || useContext(SubstraHooksContext).defaultApiProviderId;
  return useContext(SubstraHooksContext).apiProviders[id]?.apiProvider || null;
};
