import { useContext, useEffect } from 'react';
import { useSystemProperties } from './use-system-properties';
import { useIsMountedRef } from '../helpers/use-is-mounted-ref';
import { BalanceReturnType, getAccountBalance } from '../helpers/get-account-balance';
import { useApiProvider } from './use-api-provider';
import { SubstraHooksContext, useApiProvidersState, useSubstraHooksState } from '../providers';
import { BalanceTypes } from '../state/balances';

export const useAccountBalance = (
  account: string,
  apiProviderId?: string,
): BalanceReturnType | null => {
  const isMountedRef = useIsMountedRef();
  const defaultId = useContext(SubstraHooksContext).defaultApiProviderId;
  const { balancesDispatch, balancesState } = useSubstraHooksState();
  const systemProperties = useSystemProperties();
  const networkId = apiProviderId || defaultId;
  const apiProvider = useApiProvider(networkId);

  const rpcEndpoint = useApiProvidersState().apiProviders[networkId]?.rpcEndpoint;

  useEffect(() => {
    if (account && apiProvider && systemProperties) {
      const callback = ({ balance, locked, reserved, total, available }: BalanceReturnType) => {
        if (isMountedRef.current) {
          balancesDispatch({
            type: BalanceTypes.SET_BALANCE,
            payload: {
              network: networkId,
              balance: {
                balance,
                locked,
                reserved,
                total,
                available,
              },
            },
          });
        }
      };
      getAccountBalance(account, systemProperties, apiProvider, callback);
    }
  }, [account, JSON.stringify(apiProvider), systemProperties, isMountedRef, rpcEndpoint]);

  return balancesState.balances[networkId];
};
