import React, { ReactNode, useEffect, useReducer } from 'react';
import { ExtensionContext, initialState } from './context';
import { extensionReducer, Types } from './reducer';
import { useSystemProperties } from '../../hooks';
import { checkEnabled } from '../../hooks/use-polkadot-extension';
import { useIsMountedRef } from '../../helpers/use-is-mounted-ref';

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
  const isMountedRef = useIsMountedRef();
  const [state, dispatch] = useReducer(extensionReducer, initialState);
  const systemProperties = useSystemProperties();

  useEffect(() => {
    if (autoInitialiseExtension && systemProperties && !state.w3Enabled) {
      checkEnabled(extensionName, systemProperties).then(({ accounts, w3Enabled }) => {
        if (isMountedRef) {
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
        }
      });
    }
  }, [systemProperties, autoInitialiseExtension]);

  return (
    <ExtensionContext.Provider value={{ state, dispatch, extensionName }} children={children} />
  );
};
