import { ReactNode } from 'react';
import { ApiProviderConfig, SubstraHooksProvider } from '@substra-hooks/core';

interface ISubstraHooksProviderProps {
  apiProviderConfig: ApiProviderConfig;
  children: ReactNode;
}

const SubstraHooksProviderSSR = ({ apiProviderConfig, children }: ISubstraHooksProviderProps) => {
  return (
    <SubstraHooksProvider
      apiProviderConfig={apiProviderConfig}
      defaultApiProviderId={'kusama'}
      autoInitialiseExtension>
      {children}
    </SubstraHooksProvider>
  );
};

export default SubstraHooksProviderSSR;
