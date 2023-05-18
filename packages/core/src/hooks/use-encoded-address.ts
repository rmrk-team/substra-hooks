import { useMemo } from 'react';
import { useSystemProperties } from './use-system-properties';
import { getEncodedAddress } from '../helpers/get-encoded-address';

type Options = {
  skip?: boolean
}

export const useEncodedAddress = (address: string, ss58Format?: number, options?: Options) => {
  const { skip = false } = options || {};
  const systemProperties = useSystemProperties();

  const userAddressEncoded = useMemo(() => {
    if (!skip && address) {
      return getEncodedAddress(address, systemProperties, ss58Format);
    }
    return '';
  }, [address, systemProperties.ss58Format, ss58Format, skip]);

  return userAddressEncoded;
};
