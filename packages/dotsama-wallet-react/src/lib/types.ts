import { InjectedMetadata, InjectedProvider, Unsubcall } from '@polkadot/extension-inject/types';
import { Signer as InjectedSigner } from '@polkadot/api/types';
import { WalletError } from './errors/base-wallet-error';

export type SubscriptionFn = (accounts: WalletAccount[] | undefined) => void | Promise<void>;

export interface WalletLogoProps {
  // Logo url
  src: string;
  // Alt for the Logo url
  alt: string;
}

export interface WalletAccount {
  address: string;
  source: string;
  name?: string;
  wallet?: Wallet;
  signer?: unknown;
}

export enum WALLET_EXTENSIONS {
  polkadot = 'polkadot-js',
  subwallet = 'subwallet-js',
  talisman = 'talisman',
}

export enum MOBILE_WALLET_APPS {
  nova = 'nova',
  mathWallet = 'mathWallet',
}

export interface WalletData {
  // The name of the wallet extension. Should match `Account.source`
  extensionName: WALLET_EXTENSIONS;
  // Display name for the wallet extension
  title: string;
  // Message to display if wallet extension is not installed
  noExtensionMessage?: string;
  // The URL to install the wallet extension
  installUrl: {
    chrome: string;
    firefox: string;
  };
  // The wallet logo
  logo: WalletLogoProps;
}

export interface WalletExtension {
  installed: boolean | undefined;

  // The raw extension object which will have everything a dapp developer needs.
  // Refer to a specific wallet's extension documentation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extension: any;

  // The raw signer object for convenience. Usually the implementer can derive this from the extension object.
  // Refer to a specific wallet's extension documentation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer: InjectedSigner | undefined;

  metadata: InjectedMetadata | undefined;

  provider: InjectedProvider | undefined;
}

interface Connector {
  enable: () => unknown;

  // The subscribe to accounts function
  subscribeAccounts: (callback: SubscriptionFn, ss58Format?: number) => Promise<Unsubcall | null>;

  getAccounts: (ss58Format?: number) => Promise<WalletAccount[] | null>;
}

interface WalletErrors {
  transformError: (err: WalletError) => Error;
}

export interface Wallet extends WalletData, WalletExtension, Connector, WalletErrors {}

export interface WalletMobile {
  appName: MOBILE_WALLET_APPS;
  // Display name for the wallet extension
  title: string;
  // The URL to install the wallet extension
  installUrl: {
    android: string;
    ios: string;
  };
  // The wallet logo
  logo: WalletLogoProps;
}
