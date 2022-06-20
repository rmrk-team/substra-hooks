import { BaseDotsamaWallet } from '../../../base-dotsama-wallet/base-dotsama-wallet';
import { WALLET_EXTENSIONS } from '../../../types';
import { icons } from '../../../logos-svg';

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
    src: `data:image/svg+xml;base64,${btoa(icons.polkadotJsLogo)}`,
    alt: 'Polkadotjs Logo',
  };
}
