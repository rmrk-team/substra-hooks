import { useContext, useEffect, useState } from 'react';
import { useSystemProperties } from './use-system-properties';
import { useIsMountedRef } from '../helpers/use-is-mounted-ref';
import { BalanceReturnType, getAccountBalance } from '../helpers/get-account-balance';
import { useApiProvider } from './use-api-provider';
import { SubstraHooksContext, useSubstraHooksState } from '../providers';
import { BalanceTypes } from '../providers/substrahooks-provider/reducer';

export const useAccountBalance = (
  account: string,
  apiProviderId?: string,
): BalanceReturnType | null => {
  const isMountedRef = useIsMountedRef();
  const defaultId = useContext(SubstraHooksContext).defaultApiProviderId;
  const { balancesDispatch, balancesState } = useSubstraHooksState();
  const systemProperties = useSystemProperties();
  const apiProvider = useApiProvider();

  const networkId = apiProviderId || defaultId;

  useEffect(() => {
    if (account && apiProvider && systemProperties) {

      const getBalancesAsync = async () => {
        const balances = await getAccountBalance(account, systemProperties, apiProvider);
        if (isMountedRef.current) {
          balancesDispatch({
            type: BalanceTypes.SET_BALANCE,
            payload: {
              network: networkId,
              balance: balances,
            },
          });
        }
      }

      getBalancesAsync();
    }
  }, [account, apiProvider, systemProperties, isMountedRef]);

  return balancesState.balances[networkId];
};
