import { ISystemProperties } from '../types/system-properties';
import { ApiPromise } from '@polkadot/api';
import { formatPrice } from './format-price';

export interface BalanceReturnType {
  balanceRaw: bigint | null;
  balanceFormatted: string | null;
}

export const getAccountBalance = (
  account: string,
  systemProperties: ISystemProperties,
  api: ApiPromise,
  callback: (balance: BalanceReturnType) => void,
) => {
  api.query.system.account(account, ({ data: { free: currentFree, feeFrozen: currentLocked } }) => {
    const balanceRaw = currentFree.toBigInt() - currentLocked.toBigInt();
    const balanceFormatted = formatPrice(balanceRaw, systemProperties, true);
    if (callback) {
      callback({ balanceFormatted, balanceRaw });
    }
  });
};
