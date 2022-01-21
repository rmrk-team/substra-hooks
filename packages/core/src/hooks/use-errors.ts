import { useContext } from 'react';
import { SubstraHooksContext, useSubstraHooksState } from '../providers';

export const useBlockSyncError = (apiProviderId?: string): Error | null => {
  const defaultId = useContext(SubstraHooksContext).defaultApiProviderId;
  const { errorsState } = useSubstraHooksState();

  const networkId = apiProviderId || defaultId;

  return errorsState.blockSyncErrors[networkId] || null;
};
