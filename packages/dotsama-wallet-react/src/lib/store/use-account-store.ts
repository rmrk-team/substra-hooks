import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ACCOUNT_MODAL_STEPS } from './types';
import { WalletAccount } from '../types';

export type TAccountModalStore = {
  modalOpened: boolean;
  toggleAccountSelectionModal: (modalOpened: boolean, step?: ACCOUNT_MODAL_STEPS) => void;
  step: ACCOUNT_MODAL_STEPS;
  setStep: (step: ACCOUNT_MODAL_STEPS) => void;
};

export const useAccountModalStore = create<TAccountModalStore>((set) => ({
  modalOpened: false,
  toggleAccountSelectionModal: (
    modalOpened: boolean,
    step: ACCOUNT_MODAL_STEPS = ACCOUNT_MODAL_STEPS.wallets,
  ) => {
    set({ modalOpened, step });
  },
  step: ACCOUNT_MODAL_STEPS.wallets,
  setStep: (step: ACCOUNT_MODAL_STEPS) => {
    set({ step });
  },
}));

export const modalOpenedSelector = (state: TAccountModalStore) => state.modalOpened;
export const toggleAccountSelectionModalSelector = (state: TAccountModalStore) =>
  state.toggleAccountSelectionModal;
export const stepSelector = (state: TAccountModalStore) => state.step;
export const setStepSelector = (state: TAccountModalStore) => state.setStep;

export type TPurchaseTokensModalStore = {
  toggleRampModal: (rampModalOpened: boolean) => void;
  rampModalOpened: boolean;
};

export const usePurchaseTokensModalStore = create<TPurchaseTokensModalStore>((set) => ({
  rampModalOpened: false,
  toggleRampModal: (rampModalOpened: boolean) => {
    set({ rampModalOpened });
  },
}));

export const rampModalOpenedSelector = (state: TPurchaseTokensModalStore) => state.rampModalOpened;
export const toggleRampModalSelector = (state: TPurchaseTokensModalStore) => state.toggleRampModal;

/*
 * Wallet accounts store
 */

export type TAccountsStore = {
  accounts: WalletAccount[] | null;
  setAccounts: (accounts: WalletAccount[] | null) => void;
};

export const useAccountsStore = create<TAccountsStore>((set) => ({
  accounts: null,
  setAccounts: (accounts: WalletAccount[] | null) => {
    set({ accounts });
  },
}));

export const accountsSelector = (state: TAccountsStore) => state.accounts;
export const setAccountsSelector = (state: TAccountsStore) => state.setAccounts;

/*
 * Select account store
 */
export type TSelectedAccountsStore = {
  selectedAccount: WalletAccount | null;
  setSelectedAccount: (selectedAccount: WalletAccount | null) => void;
};

export const useSelectedAccountsStore = create<TSelectedAccountsStore>()(
  persist(
    (set) => ({
      setSelectedAccount: (selectedAccount: WalletAccount | null) => {
        set({ selectedAccount });
      },
      selectedAccount: null,
    }),
    {
      name: 'selected-account-storage',
    },
  ),
);

export const setSelectedAccountSelector = (state: TSelectedAccountsStore) =>
  state.setSelectedAccount;

export const selectedAccountSelector = (state: TSelectedAccountsStore) => state.selectedAccount;

/*
 * Metamask account store
 */

export type TMetaMaskAccountStore = {
  metaMaskAccount: string;
  setMetaMaskAccount: (metaMaskAccount: string) => void;
  setWrongNetwork: (wrongNetwork: boolean) => void;
  wrongNetwork: boolean;
};

export const useMetaMaskAccountStore = create<TMetaMaskAccountStore>()(
  persist(
    (set) => ({
      setMetaMaskAccount: (metaMaskAccount: string) => {
        set({ metaMaskAccount });
      },
      setWrongNetwork: (wrongNetwork: boolean) => {
        set({ wrongNetwork });
      },
      metaMaskAccount: '',
      wrongNetwork: false,
    }),
    {
      name: 'metamask-account',
    },
  ),
);

export const setMetaMaskAccountSelector = (state: TMetaMaskAccountStore) =>
  state.setMetaMaskAccount;
export const metaMaskAccountSelector = (state: TMetaMaskAccountStore) => state.metaMaskAccount;
export const setWrongNetworkSelector = (state: TMetaMaskAccountStore) => state.setWrongNetwork;
export const wrongNetworkSelector = (state: TMetaMaskAccountStore) => state.wrongNetwork;
