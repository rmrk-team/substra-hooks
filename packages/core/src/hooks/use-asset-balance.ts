import { useContext, useEffect, useState } from 'react';
import { SubstraHooksContext } from '../providers/substrahooks-provider/context';
import { useSystemProperties } from './use-system-properties';
import { useIsMountedRef } from '../helpers/use-is-mounted-ref';
import { BalanceReturnType } from '../helpers/get-account-balance';
import { getAssetBalance } from '../helpers/get-asset-balance';

export const useAssetBalance = (account: string, assetId: number): BalanceReturnType | null => {
  const isMountedRef = useIsMountedRef();
  const systemProperties = useSystemProperties();
  const apiProvider = useContext(SubstraHooksContext).apiProvider;
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
