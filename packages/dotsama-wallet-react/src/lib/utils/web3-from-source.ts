import { useWalletsStore } from '../store';
import { getWalletBySource } from '../wallets';
import { WALLET_EXTENSIONS } from '../types';

export const web3FromSource = () => {
  const { selectedWallet } = useWalletsStore.getState();
  const wallet = getWalletBySource(selectedWallet as WALLET_EXTENSIONS);

  return wallet?.extension;
};
