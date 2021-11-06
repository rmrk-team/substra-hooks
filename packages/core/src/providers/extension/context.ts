import { createContext, Dispatch, useContext } from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { ExtensionActions } from './reducer';

export interface ExtensionState {
  w3Enabled: boolean;
  accounts: InjectedAccountWithMeta[] | null;
}

export const initialState: ExtensionState = {
  w3Enabled: false,
  accounts: null,
};

export const ExtensionContext = createContext<{
  state: ExtensionState;
  dispatch: Dispatch<ExtensionActions>;
  extensionName: string;
}>({
  state: initialState,
  dispatch: () => null,
  extensionName: 'polkadot-extension'
});

export function useExtensionState() {
  return useContext(ExtensionContext);
}
