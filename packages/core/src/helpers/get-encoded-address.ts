import { encodeAddress } from '@polkadot/keyring';
import { ISystemProperties } from '../types/system-properties';

export const getEncodedAddress = (
  address: string,
  systemProperties: ISystemProperties,
  ss58Format?: number,
) => {
  try {
    return encodeAddress(address, ss58Format || systemProperties.ss58Format);
  } catch (error: any) {
    console.log(error);
    return '';
  }

};
