import { useContext, useEffect, useState } from 'react';
import { SubstraHooksContext } from '../providers/substrahooks-provider/context';
import { useSystemProperties } from './use-system-properties';
import { formatPrice } from '../helpers/format-price';
import { useIsMountedRef } from '../helpers/use-is-mounted-ref';

interface BalanceReturnType {
  balanceRaw: bigint | null;
  balanceFormatted: string | null;
}

export const useAccountBalance = (account: string): BalanceReturnType | null => {
  const isMountedRef = useIsMountedRef();
  const systemProperties = useSystemProperties();
  const apiProvider = useContext(SubstraHooksContext).apiProvider;
  const [balance, setBalance] = useState<BalanceReturnType>({
    balanceRaw: null,
    balanceFormatted: null,
  });

  useEffect(() => {
    if (account && apiProvider && systemProperties) {
      apiProvider.query.system.account(account, ({ data: { free: currentFree } }) => {
        const balanceRaw = currentFree.toBigInt();
        const balanceFormatted = formatPrice(balanceRaw, systemProperties, true);
        if (isMountedRef.current) {
          setBalance({ balanceFormatted, balanceRaw });
        }
      });
    }
  }, [account, apiProvider, systemProperties, isMountedRef]);

  return balance;
};
