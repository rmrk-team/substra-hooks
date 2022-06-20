import { BaseDotsamaWallet } from '../../../base-dotsama-wallet/base-dotsama-wallet';
import { WALLET_EXTENSIONS } from '../../../types';
import { icons } from '../../../logos-svg';

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
    src: `data:image/svg+xml;base64,${btoa(icons.talismanLogo)}`,
    alt: 'Talisman Logo',
  };
}
