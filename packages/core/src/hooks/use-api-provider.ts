import { useContext } from 'react';
import { SubstraHooksContext } from '../providers/substrahooks-provider/context';
import { ApiPromise } from '@polkadot/api';

export const useApiProvider = (apiProviderId?: string): ApiPromise | null => {
  const defaultId = useContext(SubstraHooksContext).defaultApiProviderId;
  return useContext(SubstraHooksContext).apiProviders[apiProviderId || defaultId]?.apiProvider;
};
