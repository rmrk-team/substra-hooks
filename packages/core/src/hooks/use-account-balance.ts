import { useContext, useEffect, useState } from 'react';
import { SubstraHooksContext } from '../providers/substrahooks-provider/context';
import { useSystemProperties } from './use-system-properties';
import { useIsMountedRef } from '../helpers/use-is-mounted-ref';
import {BalanceReturnType, getAccountBalance} from "../helpers/get-account-balance";

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
      if (account && apiProvider && systemProperties) {
        const callback = ({ balanceFormatted, balanceRaw }: BalanceReturnType) => {
          if (isMountedRef.current) {
            setBalance({ balanceFormatted, balanceRaw });
          }
        };
        getAccountBalance(account, systemProperties, apiProvider, callback);
      }
    }
  }, [account, apiProvider, systemProperties, isMountedRef]);

  return balance;
};
