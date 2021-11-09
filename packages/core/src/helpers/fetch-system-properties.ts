import { ApiPromise } from '@polkadot/api';

export const systemPropertiesDefaults = {
  tokenDecimals: 12,
  tokenSymbol: 'KSM',
  ss58Format: 2,
};

export const fetchSystemProperties = async (polkadotApi: ApiPromise) => {
  const systemProperties = await polkadotApi.rpc.system.properties();
  const { tokenDecimals, tokenSymbol, ss58Format } = systemProperties.toHuman();
  let decimals = tokenDecimals;
  let symbol = tokenSymbol;
  if (Array.isArray(tokenDecimals)) {
    decimals = tokenDecimals[0];
  }
  if (Array.isArray(tokenSymbol)) {
    symbol = tokenSymbol[0];
  }
  if (typeof decimals !== 'string') {
    decimals = systemPropertiesDefaults.tokenDecimals;
  }
  if (typeof decimals === 'string') {
    decimals = parseInt(decimals);
  }

  let ss58FormatFinal = systemPropertiesDefaults.ss58Format;
  try {
    ss58FormatFinal = !isNaN(parseInt(ss58Format as string))
      ? parseInt(ss58Format as string)
      : ss58FormatFinal;
  } catch (error: any) {
    console.log(error);
  }

  return {
    tokenDecimals: decimals || systemPropertiesDefaults.tokenDecimals,
    tokenSymbol: (symbol as string) || systemPropertiesDefaults.tokenSymbol,
    ss58Format: ss58FormatFinal,
  };
};
