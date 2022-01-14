import { ISystemProperties } from '../types/system-properties';
import { ApiPromise } from '@polkadot/api';
import { formatPrice } from './format-price';
import { fetchSystemProperties } from './fetch-system-properties';
import { BalanceReturnType } from './get-account-balance';
import { hexToString } from '@polkadot/util';

export const getAssetBalance = async (
  account: string,
  assetId: number,
  api: ApiPromise,
  systemProperties: ISystemProperties | null,
): Promise<BalanceReturnType> => {
  const _systemProperties = systemProperties || (await fetchSystemProperties(api));
  const getAsset = api.query.assets;
  const accountData = await getAsset.account(assetId, account);
  if (accountData) {
    const data = await getAsset.metadata(assetId);
    const balanceRaw = accountData.balance.toBigInt();
    const tokenDecimals = data.decimals.toNumber();
    const tokenSymbol = hexToString(data.symbol.toHex());
    const balanceFormatted = formatPrice(
      balanceRaw,
      { tokenDecimals, tokenSymbol, ss58Format: _systemProperties.ss58Format },
      true,
    );

    const balance = {
      raw: balanceRaw,
      formatted: balanceFormatted,
    };

    return {
      balance,
    };
  } else {
    return {
      balance: {
        raw: BigInt(0),
        formatted: '0',
      },
    };
  }
};
