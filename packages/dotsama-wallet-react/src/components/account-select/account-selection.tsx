import React, { useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useSystemProperties } from '@substra-hooks/core';
import {
  accountsSelector,
  setAccountsSelector,
  setStepSelector,
  stepSelector,
  useAccountModalStore,
  useAccountsStore,
} from '../../lib/store/use-account-store';
import { selectedWalletSelector, useWalletsStore } from '../../lib/store';
import { getWalletBySource } from '../../lib/wallets';
import { ACCOUNT_MODAL_STEPS } from '../../lib/store/types';
import AccountSelect from './account-select';
import NowAllowed from './not-allowed';
import { isMobile } from '../../lib/utils/ua-detect';

const AccountSelection = () => {
  const systemProperties = useSystemProperties();
  const accounts = useAccountsStore(accountsSelector);
  const setAccounts = useAccountsStore(setAccountsSelector);
  const setStep = useAccountModalStore(setStepSelector);
  const step = useAccountModalStore(stepSelector);
  const selectedWallet = useWalletsStore(selectedWalletSelector);
  const wallet = getWalletBySource(selectedWallet);

  const onBackClick = () => {
    setStep(ACCOUNT_MODAL_STEPS.wallets);
  };

  const modalContent = () => {
    switch (step) {
      case ACCOUNT_MODAL_STEPS.accounts:
        return <AccountSelect accounts={accounts} />;

      case ACCOUNT_MODAL_STEPS.notAllowed:
        return <NowAllowed />;
      default:
        return;
    }
  };

  const subscribeToAccountWallets = async () => {
    if (wallet?.installed) {
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

  useEffect(() => {
    subscribeToAccountWallets();
  }, []);

  return (
    <Box data-name={'account-selection'}>
      {!isMobile && (
        <Box mb={4}>
          <Button
            size={'sm'}
            variant={'ghost'}
            colorScheme={'pink'}
            leftIcon={<ArrowBackIcon />}
            px={0}
            _hover={{
              background: 'transparent',
              textDecoration: 'underline',
            }}
            _focus={{
              outline: 'none',
            }}
            _active={{
              outline: 'none',
            }}
            onClick={onBackClick}>
            Back to wallet selection
          </Button>
        </Box>
      )}

      {modalContent()}
    </Box>
  );
};

export default AccountSelection;
