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
  available?: BalanceDataType;
}

export const getAccountBalance = async (
  account: string,
  systemProperties: ISystemProperties,
  api: ApiPromise,
  callback: (balance: BalanceReturnType) => void,
) => {
  api.query.system.account(
    account,
    async ({ data: { free: currentFree, frozen: currentLocked, reserved: currentReserved } }) => {
      const { availableBalance } = await api.derive.balances.all(account);

      const balanceRaw = currentFree?.toBigInt() || BigInt(0);
      const balanceLockedRaw = currentLocked?.toBigInt() || BigInt(0);
      const balanceReservedRaw = currentReserved?.toBigInt() || BigInt(0);
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

      const available = {
        raw: availableBalance.toBigInt(),
        formatted: formatPrice(availableBalance.toBigInt(), systemProperties, true),
      };

      if (callback) {
        callback({
          balance,
          locked,
          reserved,
          total,
          available,
        });
      }
    },
  );
};
