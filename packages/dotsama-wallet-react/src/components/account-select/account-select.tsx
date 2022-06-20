import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Stack,
  useRadioGroup,
} from '@chakra-ui/react';
import AccountRadio from './account-radio';
import { useSystemProperties } from '@substra-hooks/core';
import { AiOutlineDisconnect } from '@react-icons/all-files/ai/AiOutlineDisconnect';
import Fuse from 'fuse.js';
import { WalletAccount } from '../../lib/types';
import {
  selectedAccountSelector,
  setSelectedAccountSelector,
  toggleAccountSelectionModalSelector,
  useAccountModalStore,
  useSelectedAccountsStore,
} from '../../lib/store/use-account-store';
import {
  selectedWalletSelector,
  setSelectedWalletSelector,
  useWalletsStore,
} from '../../lib/store/use-wallet-store';
import { getWalletBySource } from '../../lib/wallets';
import { useSearchInObjects } from '../../hooks/use-search-in-objects';
import SearchBox from '../common/search-box';

interface IProps {
  accounts?: WalletAccount[] | null;
}

const FUSE_OPTIONS: Fuse.IFuseOptions<WalletAccount> = {
  keys: [
    {
      name: 'name',
      weight: 0.7,
    },
    {
      name: 'address',
      weight: 0.3,
    },
  ],
  threshold: 0.45,
};

const AccountSelect = ({ accounts }: IProps) => {
  const systemProperties = useSystemProperties();
  const toggleAccountSelectionModal = useAccountModalStore(toggleAccountSelectionModalSelector);
  const selectedAccount = useSelectedAccountsStore(selectedAccountSelector);
  const setSelectedAccount = useSelectedAccountsStore(setSelectedAccountSelector);
  const setSelectedWallet = useWalletsStore(setSelectedWalletSelector);
  const selectedWallet = useWalletsStore(selectedWalletSelector);
  const wallet = getWalletBySource(selectedWallet);
  const walletName = wallet?.title;

  const selectAccount = async (accountId: string) => {
    if (accounts) {
      const newAccount = accounts.find((account) => account.address === accountId);
      if (newAccount) {
        setSelectedAccount(newAccount);
      }
      toggleAccountSelectionModal(false);
    } else {
      setSelectedAccount(null);
    }
  };

  const disconnectSubstrateAccount = () => {
    setSelectedAccount(null);
    setSelectedWallet(null);
    toggleAccountSelectionModal(false);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: selectedAccount?.address,
    name: 'account',
    onChange: selectAccount,
  });

  const group = getRootProps();

  const { filtered: filteredAccounts, searchBoxProps } = useSearchInObjects(accounts || [], {
    fuseOptions: FUSE_OPTIONS,
  });

  return (
    <Flex direction={'column'} align={'center'} {...group} data-name={'account-select'}>
      <SearchBox {...searchBoxProps} placeholder="Search by name or address" />
      <Stack spacing={4} mt={6} mb={4}>
        {accounts && accounts.length > 0 ? (
          filteredAccounts.length > 0 ? (
            filteredAccounts.map((account) => {
              const radio = getRadioProps({ value: account.address });
              return (
                <Flex key={account.address} align={'center'}>
                  <Box flexGrow={1} pr={4}>
                    <AccountRadio
                      {...radio}
                      account={account}
                      systemProperties={systemProperties}
                    />
                  </Box>
                </Flex>
              );
            })
          ) : (
            <AccountSelectEmptyState>No matching accounts found</AccountSelectEmptyState>
          )
        ) : (
          <AccountSelectEmptyState>
            Sorry you don't have any accounts on {walletName}
          </AccountSelectEmptyState>
        )}
      </Stack>
      {selectedAccount && (
        <Button onClick={disconnectSubstrateAccount} leftIcon={<AiOutlineDisconnect />}>
          Disconnect
        </Button>
      )}
    </Flex>
  );
};

interface EmptyStateProps {
  children?: React.ReactNode
};

const AccountSelectEmptyState: React.FC<EmptyStateProps> = ({ children }) => (
  <Box pb={2}>
    <Alert data-name="initial-resadd-msg" status={'warning'}>
      <AlertIcon />
      <Box>
        <AlertDescription>{children}</AlertDescription>
      </Box>
    </Alert>
  </Box>
);

export default AccountSelect;
