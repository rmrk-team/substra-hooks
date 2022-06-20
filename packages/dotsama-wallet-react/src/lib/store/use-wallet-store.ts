import create from 'zustand';
import { persist } from 'zustand/middleware';
import { WALLET_EXTENSIONS } from '../types';

export type TWalletsStore = {
  selectedWallet: WALLET_EXTENSIONS | null;
  setSelectedWallet: (wallet: WALLET_EXTENSIONS | null) => void;
};

export const useWalletsStore = create<TWalletsStore>()(
  persist(
    (set) => ({
      selectedWallet: null,
      setSelectedWallet: (selectedWallet) => {
        set({ selectedWallet });
      },
    }),
    {
      name: 'select-wallet-storage',
    },
  ),
);

export const selectedWalletSelector = (state: TWalletsStore) => state.selectedWallet;
export const setSelectedWalletSelector = (state: TWalletsStore) => state.setSelectedWallet;
