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
  const [balanceFormatted, setBalanceFormatted] = useState<string | null>(null);
  const [balanceRaw, setBalanceRaw] = useState<bigint | null>(null);

  const listenToBalances = async (
    account: string,
    api: ApiPromise,
    systemProperties: ISystemProperties,
  ) => {
    api.query.system.account(account, ({ data: { free: currentFree } }) => {
      const balance = currentFree.toBigInt();
      const balanceFormatted = formatPrice(balance, systemProperties, true);
      setBalanceFormatted(balanceFormatted);
      setBalanceRaw(balance);
    });
  };

  useEffect(() => {
    if (apiProvider && systemProperties) {
      listenToBalances(account, apiProvider, systemProperties);
    }
  }, [apiProvider, systemProperties]);

  return { balanceFormatted, balanceRaw };
};
