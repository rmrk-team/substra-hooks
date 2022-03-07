import '../styles/globals.css';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
const SubstraHooksProviderSSR = dynamic(() => import('../components/app/substra-hooks-provider'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SubstraHooksProviderSSR
      defaultApiProviderId="kusama"
      apiProviderConfig={{
        kusama: {
          id: 'kusama',
          wsProviderUrl: 'wss://kusama-rpc.polkadot.io',
        },
        statemine: {
          id: 'statemine',
          wsProviderUrl: 'wss://statemine-rpc.polkadot.io',
        },
        development: {
          id: 'development',
          wsProviderUrl: 'ws://127.0.0.1:9944',
        },
      }}>
      <Component {...pageProps} />
    </SubstraHooksProviderSSR>
  );
}

export default MyApp;
