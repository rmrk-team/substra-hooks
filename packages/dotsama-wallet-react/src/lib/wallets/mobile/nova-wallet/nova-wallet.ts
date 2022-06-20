import { MOBILE_WALLET_APPS, WalletMobile } from '../../../types';

export const novaWallet: WalletMobile = {
  appName: MOBILE_WALLET_APPS.nova,
  title: 'Nova',
  installUrl: {
    android: 'https://play.google.com/store/apps/details?id=io.novafoundation.nova.market',
    ios: 'https://apps.apple.com/app/nova-polkadot-kusama-wallet/id1597119355',
  },
  logo: {
    src: 'https://rmrk.mypinata.cloud/ipfs/QmWX5gB7qYikWs1M3NyEMTRmx2gFWDsxvRi6qv5VbLbB1D',
    alt: 'Nova Wallet Logo',
  },
};
