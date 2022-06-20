import React from 'react';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import AccountSelection from './account-selection';
import {
  modalOpenedSelector,
  stepSelector,
  toggleAccountSelectionModalSelector,
  useAccountModalStore,
} from '../../lib/store/use-account-store';
import { ACCOUNT_MODAL_STEPS } from '../../lib/store/types';
import WalletSelect from '../wallet/wallet-select';

export const ConnectAccountModal = () => {
  const modalOpened = useAccountModalStore(modalOpenedSelector);
  const step = useAccountModalStore(stepSelector);
  const toggleAccountSelectionModal = useAccountModalStore(toggleAccountSelectionModalSelector);

  const onClose = () => {
    toggleAccountSelectionModal(false);
  };

  const modalContent = () => {
    switch (step) {
      case ACCOUNT_MODAL_STEPS.wallets:
        return <WalletSelect />;
      case ACCOUNT_MODAL_STEPS.accounts:
      case ACCOUNT_MODAL_STEPS.notAllowed:
        return <AccountSelection />;
    }
  };

  return (
    <Modal isOpen={modalOpened} onClose={onClose} size="lg" data-name={'connect-account-modal'}>
      <ModalOverlay width="full" height="full" />
      <ModalContent margin="inherit auto" width="full" maxW={['auto', '540px']} flexShrink={0}>
        <ModalHeader p={4}>Connect your wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={5} pt={0} pb={4} w={'100%'}>
          <Box>{modalContent()}</Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
