import logo from '../../../logos/talisman-logo.svg';
import { BaseDotsamaWallet } from '../../../base-dotsama-wallet/base-dotsama-wallet';
import { WALLET_EXTENSIONS } from '../../../types';

export class TalismanWallet extends BaseDotsamaWallet {
  extensionName = WALLET_EXTENSIONS.talisman;
  title = 'Talisman';
  installUrl = {
    chrome:
      'https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld',
    firefox:
      'https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld',
  };
  noExtensionMessage = 'You can use any Polkadot compatible wallet';
  logo = {
    src: logo,
    alt: 'Talisman Logo',
  };
}
