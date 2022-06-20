import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import WalletSwitchDesktop from './wallet-switch-desktop';
import { useSystemProperties } from '@substra-hooks/core';
import { dashify } from '../../lib/utils/dashify';
import { setSelectedWalletSelector, useWalletsStore } from '../../lib/store';
import { WALLET_EXTENSIONS } from '../../lib/types';
import { desktopWallets, getWalletBySource, mobileWallets } from '../../lib/wallets';
import {
  setAccountsSelector,
  setStepSelector,
  useAccountModalStore,
  useAccountsStore,
} from '../../lib/store/use-account-store';
import { ACCOUNT_MODAL_STEPS } from '../../lib/store/types';
import WalletSwitchMobile from './wallet-switch-mobile';
import { isMobile } from '../../lib/utils/ua-detect';

const WalletSelect = () => {
  const systemProperties = useSystemProperties();
  const setSelectedWallet = useWalletsStore(setSelectedWalletSelector);
  const setAccounts = useAccountsStore(setAccountsSelector);
  const setStep = useAccountModalStore(setStepSelector);

  const onSelect = async (walletKey: WALLET_EXTENSIONS) => {
    const wallet = getWalletBySource(walletKey);

    if (wallet?.installed) {
      await setSelectedWallet(walletKey);

      try {
        await wallet.enable();
      } catch (e: any) {
        if (e.message.includes('not allowed to interact')) {
          setStep(ACCOUNT_MODAL_STEPS.notAllowed);
        }
      }

      await wallet.subscribeAccounts((accounts) => {
        accounts && setAccounts(accounts);
      }, systemProperties.ss58Format);
    }
  };

  return (
    <Box data-name="wallet-select">
      <VStack spacing={4}>
        {isMobile
          ? mobileWallets.map((item) => (
              <WalletSwitchMobile
                key={`wallet-select-item-${dashify(item.title)}`}
                wallet={item}
                onClick={onSelect}
              />
            ))
          : desktopWallets.map((item) => (
              <WalletSwitchDesktop
                key={`wallet-select-item-mobile-${dashify(item.title)}`}
                wallet={item}
                onClick={onSelect}
              />
            ))}
      </VStack>
    </Box>
  );
};

export default WalletSelect;
