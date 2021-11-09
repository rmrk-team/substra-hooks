import '../styles/globals.css';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
const SubstraHooksProviderSSR = dynamic(() => import('../components/app/substra-hooks-provider'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SubstraHooksProviderSSR
      apiProviderConfig={{
        kusama: {
          id: 'kusama',
          wsProviderUrl: 'wss://kusama-rpc.polkadot.io',
        },
        statemine: {
          id: 'statemine',
          wsProviderUrl: 'wss://kusama-statemine-rpc.paritytech.net',
        },
      }}>
      <Component {...pageProps} />
    </SubstraHooksProviderSSR>
  );
}

export default MyApp;
