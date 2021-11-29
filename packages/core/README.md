# SubstraHooks Core

SubstraHooks is a collection of useful react hooks that work with polkadot.js on [Substrate](https://substrate.io/) blockchains

inspired by [useDApp](https://github.com/EthWorks/useDApp)

## Usage

Add it to your project:

```console
yarn add @substra-hooks/core @polkadot/api @polkadot/extension-dapp
```

Use it in your React app:

```tsx
import React from 'react'
import { SubstraHooksProvider } from '@substra-hooks/core';

export enum NETWORKS {
    kusama = 'kusama',
    statemine = 'statemine',
}

const apiProviderConfig = {
    [NETWORKS.kusama]: {
        id: NETWORKS.kusama,
        wsProviderUrl: 'wss://kusama-rpc.polkadot.io',
    },
    [NETWORKS.statemine]: {
        id: NETWORKS.statemine,
        wsProviderUrl: 'wss://statemine-rpc.polkadot.io',
    },
}

// Wrap everything in <SubstraHooksProvider />
export default () => (
    <SubstraHooksProvider apiProviderConfig={apiProviderConfig} defaultApiProviderId={NETWORKS.kusama}>
        <App />
    </SubstraHooksProvider>
)
```

```tsx
// App.tsx
import React from 'react'
import { useAccountBalance, useSystemProperties, useAssetBalance } from '@substra-hooks/core'

const App = () => {
    const { accounts, w3enable, w3Enabled } = usePolkadotExtension();
    const { balanceFormatted } = useAccountBalance(accounts?.[0]?.address || '');
    const assetPayload = useAssetBalance(accounts?.[0]?.address || '', 8, NETWORKS.statemine);
    const systemProperties = useSystemProperties()

    console.log('systemProperties', systemProperties)

    useEffect(() => {
        if (!w3Enabled) {
            w3enable();
        }
    }, [w3Enabled])

    console.log('accounts', accounts)
    console.log('balanceFormatted', accounts?.[5]?.address || '', balanceFormatted);
    console.log('assetPayload', assetPayload);

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

If your app is using SSR (i.e. next.js) then you need to dynamically import Provider with no SSR, create your own local Provider first

```tsx
import { ReactNode } from 'react';
import { SubstraHooksProvider } from '@substra-hooks/core';

interface ISubstraHooksProviderProps {
    apiProviderConfig: ApiProviderConfig;
    children: ReactNode;
}


const SubstraHooksProviderSSR = ({ apiProviderConfig, children }: ISubstraHooksProviderProps) => {
    return (
        <SubstraHooksProvider
            apiProviderConfig={apiProviderConfig}
            defaultApiProviderId={NETWORKS.kusama}>
            {children}
        </SubstraHooksProvider>
    );
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

### Providers

#### SubstraHooksProvider
Main Provider that includes `ExtensionProvider`

#### ExtensionProvider
Provider that mainly deals with `polkadot browser extension`

### Hooks

#### useApiProvider

Returns polkadot.js `ApiPromise`. Returns default `ApiPromise` as defined by `defaultApiProviderId` on SubstraHooksProvider, additional argument can be passed to return different `ApiPromise` from default one

`const polkadotStatemineApi = useApiProvider('statemine');`

#### useSystemProperties

Returns parsed results of `polkadotApi.rpc.system.properties` API in following format.
```ts
{
    tokenDecimals: number;
    tokenSymbol: string;
    ss58Format: number;
}
```

Returns system properties fetched from the chain connected by your default api provider, additional argument can be passed to return different system properties from different node

`const systemProperties = useSystemProperties()`

#### useAccountBalance

Returns token balance of given address from the default node.

`const { balanceFormatted, balanceRaw } = useAccountBalance(userEncodedAddress);`

#### useAssetBalance

Returns balance of specified asset id for given address from the default node.

```tsx
const { balanceFormatted, balanceRaw } = useAssetBalance(
    userEncodedAddress,
    ASSET_ID,
    'statemine',
);
```

#### useEncodedAddress

Returns substrate address in a format of `ss58Format` of your default chain node

`const ownerAddressEncoded = useEncodedAddress(owner);`

#### usePolkadotExtension

```tsx
import {useEffect} from "react";
...
const { w3Enabled, w3enable, accounts } = usePolkadotExtension();

const initialise = () => {
    if (!w3Enabled) {
        w3enable();
    }
};

useEffect(() => {
    if (!w3Enabled) {
        initialise();
    }
}, [w3Enabled])

console.log(accounts);

```
