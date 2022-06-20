import type { Signer as InjectedSigner } from '@polkadot/api/types';
import { SubscriptionFn, Wallet, WalletAccount } from '../types';
import {
  InjectedAccount,
  InjectedExtension,
  InjectedMetadata,
  InjectedProvider,
  InjectedWindow,
} from '@polkadot/extension-inject/types';
import { encodeAddress } from '@polkadot/keyring';
import { WalletError } from '../errors/base-wallet-error';
import { AuthError } from '../errors/auth-error';

const DAPP_NAME = 'Singular';

export class BaseDotsamaWallet implements Omit<Wallet, 'extensionName' | 'getAccounts'> {
  extensionName = '';
  title = '';
  installUrl = {
    chrome: '',
    firefox: '',
  };
  logo = {
    src: '',
    alt: '',
  };

  _extension: InjectedExtension | undefined;
  _signer: InjectedSigner | undefined;
  _metadata: InjectedMetadata | undefined;
  _provider: InjectedProvider | undefined;

  // API docs: https://polkadot.js.org/docs/extension/
  get extension() {
    return this._extension;
  }

  // API docs: https://polkadot.js.org/docs/extension/
  get signer() {
    return this._signer;
  }

  get metadata() {
    return this._metadata;
  }

  get provider() {
    return this._provider;
  }

  get installed() {
    const injectedWindow = window as Window & InjectedWindow;
    const injectedExtension = injectedWindow?.injectedWeb3?.[this.extensionName];

    return !!injectedExtension;
  }

  get rawExtension() {
    const injectedWindow = window as Window & InjectedWindow;
    const injectedExtension = injectedWindow?.injectedWeb3?.[this.extensionName];
    return injectedExtension;
  }

  transformError = (err: Error): WalletError | Error => {
    if (err.message.includes('pending authorization request')) {
      return new AuthError(err.message, this as Wallet);
    }
    return err;
  };

  enable = async () => {
    if (!this.installed) {
      return;
    }

    try {
      const injectedExtension = this.rawExtension;
      const rawExtension = await injectedExtension?.enable(DAPP_NAME);
      if (!rawExtension) {
        return;
      }

      const extension: InjectedExtension = {
        ...rawExtension,
        // Manually add `InjectedExtensionInfo` so as to have a consistent response.
        name: this.extensionName,
        version: injectedExtension.version,
      };

      this._extension = extension;
      this._signer = extension?.signer;
      this._metadata = extension?.metadata;
      this._provider = extension?.provider;
    } catch (err) {
      throw this.transformError(err as WalletError);
    }
  };

  subscribeAccounts = async (callback: SubscriptionFn, ss58Format?: number) => {
    if (!this._extension) {
      await this?.enable();
    }

    if (!this._extension) {
      callback(undefined);
      return null;
    }

    const unsubscribe = this._extension.accounts.subscribe((accounts: InjectedAccount[]) => {
      const accountsWithWallet = accounts.map((account) => {
        return {
          ...account,
          address: encodeAddress(account.address, ss58Format),
          source: this._extension?.name as string,
          // Added extra fields here for convenience
          wallet: this,
          signer: this._extension?.signer,
        };
      });
      callback(accountsWithWallet as WalletAccount[]);
    });

    return unsubscribe;
  };

  get isActive() {
    return Boolean(this.signer);
  }

  public async getAccounts(ss58Format?: number): Promise<InjectedAccount[] | null> {
    if (!this._extension) {
      await this?.enable();
    }

    if (!this._extension) {
      return null;
    }

    const accounts = await this._extension.accounts.get();

    return accounts.map((account) => {
      return {
        ...account,
        address: encodeAddress(account.address, ss58Format),
        source: this._extension?.name as string,
        // Added extra fields here for convenience
        wallet: this,
        signer: this._extension?.signer,
      };
    });
  }
}
