import React, { ReactNode } from 'react';
import { ApiProviderConfig, SubstraHooksProvider, ExtensionProvider } from '@substra-hooks/core';

interface ISubstraHooksProviderProps {
  apiProviderConfig: ApiProviderConfig;
  children: ReactNode;
  defaultApiProviderId?: string;
}

const SubstraHooksProviderSSR = ({
  apiProviderConfig,
  children,
  defaultApiProviderId,
}: ISubstraHooksProviderProps) => {
  return (
    <SubstraHooksProvider
      apiProviderConfig={apiProviderConfig}
      defaultApiProviderId={defaultApiProviderId || 'kusama'}>
      <ExtensionProvider autoInitialiseExtension={false}>
        {children}
      </ExtensionProvider>

    </SubstraHooksProvider>
  );
};

export default SubstraHooksProviderSSR;
