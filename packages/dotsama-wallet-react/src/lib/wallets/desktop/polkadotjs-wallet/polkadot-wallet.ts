import logo from '../../../logos/polkadot-js-logo.svg';
import { BaseDotsamaWallet } from '../../../base-dotsama-wallet/base-dotsama-wallet';
import { WALLET_EXTENSIONS } from '../../../types';

export class PolkadotjsWallet extends BaseDotsamaWallet {
  extensionName = WALLET_EXTENSIONS.polkadot;
  title = 'Polkadot{.js}';
  noExtensionMessage = 'You can use any Polkadot compatible wallet';
  installUrl = {
    chrome:
      'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd/related',
    firefox: 'https://addons.mozilla.org/en-GB/firefox/addon/polkadot-js-extension/',
  };
  logo = {
    src: logo,
    alt: 'Polkadotjs Logo',
  };
}
