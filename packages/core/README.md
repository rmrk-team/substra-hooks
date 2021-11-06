# SubstraHooks Core

SubstraHooks is a collection of useful react hooks that work with substrate blockchains

## Usage

Add it to your project:

```console
yarn add @substra-hooks/core
```

Use it in your React app:

```jsx
// App.js

import React from 'react'
import { useAccountBalance } from '@substra-hooks/core'

const App = () => {
    const { balanceRaw, balanceFormatted } = useAccountBalance(userEncodedAddress);

    return (
        <>
          <h1>Balance</h1>
          {balanceFormatted && (
              <div>{balanceFormatted}</div>
          )}
        </>
    )
}
```

```jsx
import React from 'react'
import { SubstraHooksProvider } from '@substra-hooks/core'

// Wrap everything in <SubstraHooksProvider />
export default () => (
  <SubstraHooksProvider wsProviderUrl="wss://kusama-rpc.polkadot.io">
    <App />
  </SubstraHooksProvider>
)
```

If your app is using SSR (i.e. next.js) then you need to dynamically import Provider with no SSR, create your own local Provider first

```tsx
import { ReactNode } from 'react';
import { createSubstraHooksProvider } from '@substra-hooks/core';

interface ISubstraHooksProviderProps {
    wsProviderUrl: string;
    children: ReactNode;
}

const SubstraHooksProvider = createSubstraHooksProvider();

const SubstraHooksProviderSSR = ({ wsProviderUrl, children }: ISubstraHooksProviderProps) => {
    return <SubstraHooksProvider wsProviderUrl={wsProviderUrl}>{children}</SubstraHooksProvider>;
};

export default SubstraHooksProviderSSR;
```

```tsx
const SubstraHooksProviderSSR = dynamic(() => import('./substra-hook-provider'), {
  ssr: false,
});

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
      <SubstraHooksProviderSSR wsProviderUrl="wss://kusama-rpc.polkadot.io">
          <Component {...pageProps} />
      </SubstraHooksProviderSSR>
  );
};

export default MyApp;
```

## API


TODO

## Examples

TODO

