import { TalismanWallet } from './wallets/desktop/talisman-wallet/talisman-wallet';
import { SubWallet } from './wallets/desktop/subwallet/subwallet';
import { PolkadotjsWallet } from './wallets/desktop/polkadotjs-wallet/polkadot-wallet';
import { Wallet, WALLET_EXTENSIONS, WalletMobile } from './types';
import { novaWallet } from './wallets/mobile/nova-wallet/nova-wallet';
import { mathWallet } from './wallets/mobile/nova-wallet/math-wallet';

export const WALLETS: Record<string, string> = {
  talisman: 'Talisman',
  'subwallet-js': 'SubWallet',
  'polkadot-js': 'Polkadot{.js}',
};

export const desktopWallets = [
  new TalismanWallet() as Wallet,
  new SubWallet() as Wallet,
  new PolkadotjsWallet() as Wallet,
];

export const mobileWallets: WalletMobile[] = [novaWallet, mathWallet];

export const getWalletBySource = (source: WALLET_EXTENSIONS | null): Wallet | undefined => {
  return desktopWallets.find((wallet) => {
    return wallet.extensionName === source;
  });
};

export const isWalletInstalled = (source: WALLET_EXTENSIONS): boolean => {
  const wallet = getWalletBySource(source);

  return Boolean(wallet?.installed);
};
