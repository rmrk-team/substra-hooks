import { useEffect, useState } from 'react';
import { useSystemProperties } from './use-system-properties';
import { useIsMountedRef } from '../helpers/use-is-mounted-ref';
import { BalanceReturnType, getAccountBalance } from '../helpers/get-account-balance';
import { useApiProvider } from './use-api-provider';

export const useAccountBalance = (account: string): BalanceReturnType | null => {
  const isMountedRef = useIsMountedRef();
  const systemProperties = useSystemProperties();
  const apiProvider = useApiProvider();
  const [balance, setBalance] = useState<BalanceReturnType>({
    balanceRaw: null,
    balanceFormatted: null,
  });

  useEffect(() => {
    if (account && apiProvider && systemProperties) {
      if (account && apiProvider && systemProperties) {
        const callback = ({ balanceFormatted, balanceRaw }: BalanceReturnType) => {
          if (isMountedRef) {
            setBalance({ balanceFormatted, balanceRaw });
          }
        };
        getAccountBalance(account, systemProperties, apiProvider, callback);
      }
    }
  }, [account, apiProvider, systemProperties, isMountedRef]);

  return balance;
};
