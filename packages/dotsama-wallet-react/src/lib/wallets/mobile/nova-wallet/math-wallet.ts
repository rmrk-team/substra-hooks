import { MOBILE_WALLET_APPS, WalletMobile } from '../../../types';

export const mathWallet: WalletMobile = {
  appName: MOBILE_WALLET_APPS.mathWallet,
  title: 'Math Wallet',
  installUrl: {
    android: 'https://play.google.com/store/apps/details?id=com.mathwallet.android',
    ios: 'https://apps.apple.com/us/app/math-wallet-blockchain-wallet/id1383637331',
  },
  logo: {
    src: 'https://rmrk.mypinata.cloud/ipfs/QmQJDumvuyzMfh9bntXZtgzQp6xeRYr4F2DraL8hvGuzr1',
    alt: 'Math Wallet Logo',
  },
};
