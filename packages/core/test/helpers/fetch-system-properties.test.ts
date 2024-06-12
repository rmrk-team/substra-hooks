import { ApiPromise, WsProvider } from '@polkadot/api';
import { fetchSystemProperties } from '../../src/helpers/fetch-system-properties';

const createApi = async(wsUrl: string) => {
  jest.setTimeout(30000);

  const provider = new WsProvider(wsUrl);
  // const provider = new WsProvider('wss://westend-rpc.polkadot.io/');
  // const provider = new WsProvider('ws://127.0.0.1:9944/');

  const api =  new ApiPromise({ provider })

  await api.isReady;
  return api
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

    await api.disconnect();
  });

  it('Should return and parse POLKADOT systemProperties', async () => {
    const api = await createApi('wss://rpc.polkadot.io');
    const systemProperties = await fetchSystemProperties(api);
    expect(systemProperties).toStrictEqual({
      ss58Format: 0,
      tokenDecimals: 10,
      tokenSymbol: 'DOT',
    });

    await api.disconnect();
  });
});
