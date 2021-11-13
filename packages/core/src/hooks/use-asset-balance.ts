import { useContext, useEffect, useState } from 'react';
import { useSystemProperties } from './use-system-properties';
import { useIsMountedRef } from '../helpers/use-is-mounted-ref';
import { BalanceReturnType } from '../helpers/get-account-balance';
import { getAssetBalance } from '../helpers/get-asset-balance';
import { useApiProvider } from './use-api-provider';
import { SubstraHooksContext, useSubstraHooksState } from '../providers';
import { BalanceTypes } from '../providers/substrahooks-provider/reducer';

export const useAssetBalance = (
  account: string,
  assetId: number,
  apiProviderId?: string,
): BalanceReturnType | null => {
  const apiProvider = useApiProvider(apiProviderId);
  const defaultId = useContext(SubstraHooksContext).defaultApiProviderId;
  const isMountedRef = useIsMountedRef();
  const systemProperties = useSystemProperties(apiProviderId);
  const { balancesDispatch, balancesState } = useSubstraHooksState();

  const networkId = apiProviderId || defaultId;

  useEffect(() => {
    if (account && apiProvider && assetId) {
      const callback = ({ balanceFormatted, balanceRaw }: BalanceReturnType) => {
        if (isMountedRef.current) {
          balancesDispatch({
            type: BalanceTypes.SET_ASSET,
            payload: { network: networkId, balance: { balanceFormatted, balanceRaw }, assetId },
          });
        }
      };
      getAssetBalance(account, assetId, apiProvider, callback, systemProperties);
    }
  }, [account, assetId, apiProvider, systemProperties, isMountedRef]);

  return balancesState.assets[networkId]?.[assetId] || null;
};
