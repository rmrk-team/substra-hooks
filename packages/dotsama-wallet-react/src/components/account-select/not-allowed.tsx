import React from 'react';
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { selectedWalletSelector, useWalletsStore } from '../../lib/store/use-wallet-store';
import { getWalletBySource } from '../../lib/wallets';

const NowAllowed = () => {
  const selectedWallet = useWalletsStore(selectedWalletSelector);
  const wallet = getWalletBySource(selectedWallet);
  const walletName = wallet?.title;

  return (
    <Box data-name="not-allowed">
      <Alert status="warning">
        <AlertIcon />
        <AlertDescription>
          Please allow {walletName} extension to interact with Singular and try again
        </AlertDescription>
      </Alert>
    </Box>
  );
};

export default NowAllowed;
