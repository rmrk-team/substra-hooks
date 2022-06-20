import { BaseWalletError } from './base-wallet-error';

export class AuthError extends BaseWalletError {
  readonly name = 'AuthError';
}
