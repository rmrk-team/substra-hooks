import { useEffect, useState } from 'react';
import { useSystemProperties } from './use-system-properties';
import { useIsMountedRef } from '../helpers/use-is-mounted-ref';
import { BalanceReturnType } from '../helpers/get-account-balance';
import { getAssetBalance } from '../helpers/get-asset-balance';
import { useApiProvider } from './use-api-provider';

export const useAssetBalance = (
  account: string,
  assetId: number,
  apiProviderId?: string,
): BalanceReturnType | null => {
  const apiProvider = useApiProvider(apiProviderId);
  const isMountedRef = useIsMountedRef();
  const systemProperties = useSystemProperties(apiProviderId);
  const [balance, setBalance] = useState<BalanceReturnType>({
    balanceRaw: null,
    balanceFormatted: null,
  });

  useEffect(() => {
    if (account && apiProvider && assetId) {
      const callback = ({ balanceFormatted, balanceRaw }: BalanceReturnType) => {
        if (isMountedRef.current) {
          setBalance({ balanceFormatted, balanceRaw });
        }
      };
      getAssetBalance(account, assetId, apiProvider, callback, systemProperties);
    }
  }, [account, assetId, apiProvider, systemProperties, isMountedRef]);

  return balance;
};
