import { ReactNode } from 'react';
import { createSubstraHooksProvider } from '@substra-hooks/core';
import { ApiProviderConfig } from '@substra-hooks/core';

interface ISubstraHooksProviderProps {
  apiProviderConfig: ApiProviderConfig;
  children: ReactNode;
}

const SubstraHooksProviderSSR = ({ apiProviderConfig, children }: ISubstraHooksProviderProps) => {
  const SubstraHooksProvider = createSubstraHooksProvider();
  return (
    <SubstraHooksProvider apiProviderConfig={apiProviderConfig} defaultApiProviderId={'kusama'}>
      {children}
    </SubstraHooksProvider>
  );
};

export default SubstraHooksProviderSSR;
