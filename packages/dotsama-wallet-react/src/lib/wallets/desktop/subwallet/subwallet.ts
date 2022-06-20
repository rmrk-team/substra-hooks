import { BaseDotsamaWallet } from '../../../base-dotsama-wallet/base-dotsama-wallet';
import { WALLET_EXTENSIONS } from '../../../types';
import { icons } from '../../../logos-svg';

export class SubWallet extends BaseDotsamaWallet {
  extensionName = WALLET_EXTENSIONS.subwallet;
  title = 'SubWallet';
  installUrl = {
    chrome:
      'https://chrome.google.com/webstore/detail/subwallet/onhogfjeacnfoofkfgppdlbmlmnplgbn?hl=en&authuser=0',
    firefox: 'https://addons.mozilla.org/af/firefox/addon/subwallet/',
  };
  noExtensionMessage = 'You can use any Polkadot compatible wallet';
  logo = {
    src: `data:image/svg+xml;base64,${btoa(icons.subWalletLogo)}`,
    alt: 'Subwallet Logo',
  };
}
