import { ISystemProperties } from '../types/system-properties';
import { ApiPromise } from '@polkadot/api';
import { formatPrice } from './format-price';

export interface BalanceReturnType {
  balanceRaw: bigint | null;
  balanceFormatted: string | null;
  balanceLockedFormatted?: string | null;
  balanceReservedFormatted?: string | null;
  balanceTotalFormatted?: string | null;
}

export const getAccountBalance = (
  account: string,
  systemProperties: ISystemProperties,
  api: ApiPromise,
  callback: (balance: BalanceReturnType) => void,
) => {
  api.query.system.account(
    account,
    ({
      data: { free: currentFree, feeFrozen: currentLocked, reserved: currentReserved },
      data,
    }) => {
      const balanceRaw = currentFree.toBigInt();
      const balanceLockedRaw = currentLocked.toBigInt();
      const balanceReservedRaw = currentReserved.toBigInt();
      const balanceTotalRaw = balanceRaw + balanceReservedRaw;
      const fullData = data;

      const balanceFormatted = formatPrice(balanceRaw, systemProperties, true);
      const balanceLockedFormatted = formatPrice(balanceLockedRaw, systemProperties, true);
      const balanceReservedFormatted = formatPrice(balanceReservedRaw, systemProperties, true);
      const balanceTotalFormatted = formatPrice(balanceTotalRaw, systemProperties, true);

      if (callback) {
        callback({
          balanceFormatted,
          balanceRaw,
          balanceLockedFormatted,
          balanceReservedFormatted,
          balanceTotalFormatted,
        });
      }
    },
  );
};
