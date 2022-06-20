import logo from '../../../logos/sub-wallet-logo.svg';
import { BaseDotsamaWallet } from '../../../base-dotsama-wallet/base-dotsama-wallet';
import { WALLET_EXTENSIONS } from '../../../types';

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
    src: logo,
    alt: 'Subwallet Logo',
  };
}
