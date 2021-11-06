import { useContext, useEffect, useState } from 'react';
import { ISystemProperties } from '../types/system-properties';
import { SubstraHooksContext } from '../providers/substrahooks-provider/context';
import { useSystemProperties } from './use-system-properties';
import { ApiPromise } from '@polkadot/api';
import { formatPrice } from '../helpers/format-price';

interface BalanceReturnType {
  balanceRaw: bigint | null;
  balanceFormatted: string | null;
}

export const useAccountBalance = (account: string): BalanceReturnType | null => {
  const systemProperties = useSystemProperties();
  const apiProvider = useContext(SubstraHooksContext).apiProvider;
  const [balance, setBalance] = useState<BalanceReturnType>({
    balanceRaw: null,
    balanceFormatted: null,
  });

  const listenToBalances = async (
    account: string,
    api: ApiPromise,
    systemProperties: ISystemProperties,
  ) => {
    api.query.system.account(account, ({ data: { free: currentFree } }) => {
      const balance = currentFree.toBigInt();
      const balanceFormatted = formatPrice(balance, systemProperties, true);
      setBalance({ balanceRaw: balance, balanceFormatted: balanceFormatted });
    });
  };

  useEffect(() => {
    if (apiProvider && systemProperties) {
      listenToBalances(account, apiProvider, systemProperties);
    }
  }, [apiProvider, systemProperties]);

  return balance;
};
