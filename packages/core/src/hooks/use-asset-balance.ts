import { useContext, useEffect, useState } from 'react';
import { useSystemProperties } from './use-system-properties';
import { useIsMountedRef } from '../helpers/use-is-mounted-ref';
import { BalanceReturnType } from '../helpers/get-account-balance';
import { getAssetBalance } from '../helpers/get-asset-balance';
import { useApiProvider } from './use-api-provider';
import { SubstraHooksContext, useSubstraHooksState } from '../providers';
import { BalanceTypes } from '../state/balances';

type Options = {
  skip?: boolean
}

export const useAssetBalance = (
  account: string,
  assetId: number,
  apiProviderId?: string,
  options?: Options
): BalanceReturnType | null => {
  const { skip = false } = options || {};
  const apiProvider = useApiProvider(apiProviderId);
  const defaultId = useContext(SubstraHooksContext).defaultApiProviderId;
  const isMountedRef = useIsMountedRef();
  const systemProperties = useSystemProperties(apiProviderId);
  const { balancesDispatch, balancesState } = useSubstraHooksState();

  const networkId = apiProviderId || defaultId;

  useEffect(() => {
    if (!skip && account && apiProvider && assetId) {
      const callback = ({ balance }: BalanceReturnType) => {
        if (isMountedRef.current) {
          balancesDispatch({
            type: BalanceTypes.SET_ASSET,
            payload: { network: networkId, balance: { balance }, assetId },
          });
        }
      };
      getAssetBalance(account, assetId, apiProvider, callback, systemProperties);
    }
  }, [account, assetId, JSON.stringify(apiProvider?.rpc), systemProperties, isMountedRef, skip]);

  return balancesState.assets[networkId]?.[assetId] || null;
};
