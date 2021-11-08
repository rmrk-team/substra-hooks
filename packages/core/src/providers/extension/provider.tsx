import React, { ReactNode, useEffect, useReducer } from 'react';
import { ExtensionContext, initialState } from './context';
import { extensionReducer } from './reducer';
import { useSystemProperties } from '../../hooks';
import { checkEnabled } from '../../hooks/use-polkadot-extension';

interface ExtensionProviderProps {
  children: ReactNode;
  extensionName?: string;
  autoInitialiseExtension?: boolean;
}

export const ExtensionProvider = ({
  children,
  autoInitialiseExtension,
  extensionName,
}: ExtensionProviderProps) => {
  const [state, dispatch] = useReducer(extensionReducer, initialState);
  const systemProperties = useSystemProperties();

  useEffect(() => {
    if (autoInitialiseExtension && systemProperties && !state.w3Enabled) {
      checkEnabled(extensionName, dispatch, systemProperties);
    }
  }, [systemProperties, autoInitialiseExtension]);

  return (
    <ExtensionContext.Provider value={{ state, dispatch, extensionName }} children={children} />
  );
};
