import { useEffect } from 'react';
import { useSystemProperties } from '@substra-hooks/core';
import {
  setAccountsSelector,
  setSelectedAccountSelector,
  setStepSelector,
  useAccountModalStore,
  useAccountsStore,
  useSelectedAccountsStore,
} from '../../lib/store/use-account-store';
import {
  selectedWalletSelector,
  setSelectedWalletSelector,
  useWalletsStore,
} from '../../lib/store/use-wallet-store';
import { getWalletBySource, isWalletInstalled } from '../../lib/wallets';
import { isMobile } from '../../lib/utils/ua-detect';
import { WALLET_EXTENSIONS } from '../../lib/types';
import { ACCOUNT_MODAL_STEPS } from '../../lib/store/types';

const AccountStoreSync = () => {
  const setSelectedAccount = useSelectedAccountsStore(setSelectedAccountSelector);
  const setAccounts = useAccountsStore(setAccountsSelector);
  const selectedWallet = useWalletsStore(selectedWalletSelector);
  const wallet = getWalletBySource(selectedWallet);
  const systemProperties = useSystemProperties();
  const setStep = useAccountModalStore(setStepSelector);
  const setSelectedWallet = useWalletsStore(setSelectedWalletSelector);

  useEffect(() => {
    if (isMobile) {
      const isPolkadot = isWalletInstalled(WALLET_EXTENSIONS.polkadot);

      if (isPolkadot) {
        setSelectedWallet(WALLET_EXTENSIONS.polkadot);
        setStep(ACCOUNT_MODAL_STEPS.accounts);
      }
    }
  }, [isMobile]);

  useEffect(() => {
    if (wallet?.installed) {
      const saveAccountsAsync = async () => {
        try {
          await wallet.enable();
        } catch (e: any) {
          if (e.message.includes('not allowed to interact')) {
            setStep(ACCOUNT_MODAL_STEPS.notAllowed);
          }
        }

        const accounts = await wallet.getAccounts(systemProperties.ss58Format);
        setAccounts(accounts);
      };

      saveAccountsAsync();
    } else if (!selectedWallet) {
      setSelectedAccount(null);
    }
  }, [wallet?.installed, selectedWallet]);

  return null;
};

export default AccountStoreSync;
