import React from 'react';
import { Wallet, WALLET_EXTENSIONS } from '../../lib/types';
import { setStepSelector, useAccountModalStore } from '../../lib/store/use-account-store';
import { ACCOUNT_MODAL_STEPS } from '../../lib/store/types';
import { isFirefox } from '../../lib/utils/ua-detect';
import WalletButton from './wallet-button';


interface IProps {
  onClick: (wallet: WALLET_EXTENSIONS) => void;
  wallet: Wallet;
}

const WalletSwitchDesktop = ({
  onClick,
  wallet: { extensionName, installed, installUrl, title, logo },
}: IProps) => {
  const setStep = useAccountModalStore(setStepSelector);

  const onClickButton = () => {
    if (installed) {
      onClick(extensionName as WALLET_EXTENSIONS);
      setStep(ACCOUNT_MODAL_STEPS.accounts);
    }
  };

  return (
    <WalletButton
      installed={installed}
      installUrl={isFirefox ? installUrl.firefox : installUrl.chrome}
      onClick={onClickButton}
      logo={logo}
      title={title}
    />
  );
};

export default WalletSwitchDesktop;
