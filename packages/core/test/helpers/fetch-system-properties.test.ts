import { ApiPromise, WsProvider } from '@polkadot/api';
import { fetchSystemProperties } from '../../src/helpers/fetch-system-properties';

function createApi(wsUrl: string): Promise<ApiPromise> {
  jest.setTimeout(30000);

  const provider = new WsProvider(wsUrl);
  // const provider = new WsProvider('wss://westend-rpc.polkadot.io/');
  // const provider = new WsProvider('ws://127.0.0.1:9944/');

  return new ApiPromise({ provider }).isReady;
}

// Test fetchSystemProperties
describe('utils: fetchSystemProperties', () => {
  it('Should return and parse KUSAMA systemProperties', async () => {
    const api = await createApi('wss://kusama-rpc.polkadot.io');
    const systemProperties = await fetchSystemProperties(api);
    expect(systemProperties).toStrictEqual({
      ss58Format: 2,
      tokenDecimals: 12,
      tokenSymbol: 'KSM',
    });
  });

  it('Should return and parse POLKADOT systemProperties', async () => {
    const api = await createApi('wss://rpc.polkadot.io');
    const systemProperties = await fetchSystemProperties(api);
    expect(systemProperties).toStrictEqual({
      ss58Format: 0,
      tokenDecimals: 10,
      tokenSymbol: 'DOT',
    });
  });
});
