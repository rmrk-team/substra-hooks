import { ReactNode } from 'react';
import { createSubstraHooksProvider } from '@substra-hooks/core';

interface ISubstraHooksProviderProps {
    wsProviderUrl: string;
    children: ReactNode;
}

const SubstraHooksProviderSSR = ({ wsProviderUrl, children }: ISubstraHooksProviderProps) => {
    const SubstraHooksProvider = createSubstraHooksProvider();
    return <SubstraHooksProvider wsProviderUrl={wsProviderUrl} autoInitialise>{children}</SubstraHooksProvider>;
};

export default SubstraHooksProviderSSR;
