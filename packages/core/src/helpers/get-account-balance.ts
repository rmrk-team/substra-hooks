import { ISystemProperties } from '../types/system-properties';
import { ApiPromise } from '@polkadot/api';
import { formatPrice } from './format-price';

interface BalanceDataType {
  raw: bigint | null;
  formatted: string | null;
}

export interface BalanceReturnType {
  balance: BalanceDataType;
  locked?: BalanceDataType;
  reserved?: BalanceDataType;
  total?: BalanceDataType;
}

export const getAccountBalance = (
  account: string,
  systemProperties: ISystemProperties,
  api: ApiPromise,
  callback: (balance: BalanceReturnType) => void,
) => {
  api.query.system.account(
    account,
    ({ data: { free: currentFree, feeFrozen: currentLocked, reserved: currentReserved } }) => {
      const balanceRaw = currentFree.toBigInt();
      const balanceLockedRaw = currentLocked.toBigInt();
      const balanceReservedRaw = currentReserved.toBigInt();
      const balanceTotalRaw = balanceRaw + balanceReservedRaw;

      const balanceFormatted = formatPrice(balanceRaw, systemProperties, true);
      const balanceLockedFormatted = formatPrice(balanceLockedRaw, systemProperties, true);
      const balanceReservedFormatted = formatPrice(balanceReservedRaw, systemProperties, true);
      const balanceTotalFormatted = formatPrice(balanceTotalRaw, systemProperties, true);

      const balance = {
        raw: balanceRaw,
        formatted: balanceFormatted,
      };

      const locked = {
        raw: balanceLockedRaw,
        formatted: balanceLockedFormatted,
      };

      const reserved = {
        raw: balanceReservedRaw,
        formatted: balanceReservedFormatted,
      };

      const total = {
        raw: balanceTotalRaw,
        formatted: balanceTotalFormatted,
      };

      if (callback) {
        callback({
          balance,
          locked,
          reserved,
          total,
        });
      }
    },
  );
};
