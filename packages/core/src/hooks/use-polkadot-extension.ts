import { ExtensionState, useExtensionState } from '../providers/extension';
import { Dispatch, useEffect, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { ExtensionActions, Types } from '../providers/extension/reducer';
import { useSystemProperties } from './use-system-properties';
import { ISystemProperties } from '../types/system-properties';

interface UsePolkadotExtensionReturnType extends ExtensionState {
  w3enable: () => void;
}

export const checkEnabled = async (
  extensionName: string = 'polkadot-extension',
  dispatch: Dispatch<ExtensionActions>,
  systemProperties: ISystemProperties,
) => {
  const enabledApps = await web3Enable(extensionName);

  const w3Enabled = enabledApps.length > 0;

  if (w3Enabled) {
    const allAccounts = await web3Accounts({ ss58Format: systemProperties.ss58Format });
    dispatch({
      type: Types.ACCOUNTS_SET,
      payload: {
        accounts: allAccounts,
      },
    });
  }

  dispatch({
    type: Types.W3_ENABLE,
    payload: {
      w3Enabled,
    },
  });
};

export const usePolkadotExtension = (): UsePolkadotExtensionReturnType => {
  const { state, dispatch, extensionName } = useExtensionState();
  const { w3Enabled, accounts } = state;
  const [ready, setReady] = useState(false);
  const systemProperties = useSystemProperties();

  useEffect(() => {
    if (ready && systemProperties && !w3Enabled) {
      checkEnabled(extensionName, dispatch, systemProperties);
    }
  }, [ready, w3Enabled, systemProperties]);

  const w3enable = () => {
    setReady(true);
  };

  return { accounts, w3enable, w3Enabled };
};
