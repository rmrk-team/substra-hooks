import { ExtensionState, useExtensionState } from '../providers/extension';
import { useEffect, useState } from 'react';
import { useSystemProperties } from './use-system-properties';
import { ISystemProperties } from '../types/system-properties';
import { Types } from '../providers/extension/reducer';
import { useIsMountedRef } from '../helpers/use-is-mounted-ref';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

interface UsePolkadotExtensionReturnType extends ExtensionState {
  w3enable: () => void;
  initialised: boolean;
}

export const checkEnabled: (extensionName: string, systemProperties: ISystemProperties) => Promise<{ accounts: InjectedAccountWithMeta[] | null, w3Enabled: boolean }> = async (
  extensionName: string = 'polkadot-extension',
  systemProperties: ISystemProperties,
) => {
  const extensionDapp = await import('@polkadot/extension-dapp');
  const { web3Accounts, web3Enable } = extensionDapp;
  const enabledApps = await web3Enable(extensionName);
  const w3Enabled = enabledApps.length > 0;

  let accounts = null;

  if (w3Enabled) {
    accounts = await web3Accounts({ ss58Format: systemProperties.ss58Format });
  }
  return { accounts, w3Enabled };
};

export const usePolkadotExtension = (): UsePolkadotExtensionReturnType => {
  const isMountedRef = useIsMountedRef();
  const { state, dispatch, extensionName } = useExtensionState();
  const { w3Enabled, accounts, initialised } = state;
  const [ready, setReady] = useState(false);
  const systemProperties = useSystemProperties();

  useEffect(() => {
    if (ready && systemProperties && !w3Enabled) {
      checkEnabled(extensionName || 'polkadot-extension', systemProperties).then(({ accounts, w3Enabled }) => {
        if (isMountedRef.current) {
          if (w3Enabled) {
            dispatch({
              type: Types.ACCOUNTS_SET,
              payload: {
                accounts,
              },
            });
          }

          dispatch({
            type: Types.W3_ENABLE,
            payload: {
              w3Enabled,
            },
          });

          dispatch({
            type: Types.INITIALIZE,
            payload: {
              initialised: true,
            },
          });
        }
      });
    }
  }, [ready, w3Enabled, systemProperties]);

  const w3enable = () => {
    setReady(true);
  };

  return { accounts, w3enable, w3Enabled, initialised };
};
