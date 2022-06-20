import React from 'react';
import { WALLET_EXTENSIONS, WalletMobile } from '../../lib/types';
import { setStepSelector, useAccountModalStore } from '../../lib/store/use-account-store';
import { ACCOUNT_MODAL_STEPS } from '../../lib/store/types';
import WalletButton from './wallet-button';
import { isAndroid } from '../../lib/utils/ua-detect';

interface IProps {
  onClick: (wallet: WALLET_EXTENSIONS) => void;
  wallet: WalletMobile;
}

const WalletSwitchMobile = ({ onClick, wallet: { appName, installUrl, title, logo } }: IProps) => {
  const setStep = useAccountModalStore(setStepSelector);

  const onClickButton = () => {
    onClick(WALLET_EXTENSIONS.polkadot);
    setStep(ACCOUNT_MODAL_STEPS.accounts);
  };

  return (
    <WalletButton
      installUrl={isAndroid ? installUrl.android : installUrl.ios}
      onClick={onClickButton}
      logo={logo}
      title={title}
    />
  );
};

export default WalletSwitchMobile;
