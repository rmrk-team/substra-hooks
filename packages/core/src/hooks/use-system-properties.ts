import { useContext } from 'react';
import { ISystemProperties } from '../types/system-properties';
import { SubstraHooksContext } from '../providers/substrahooks-provider/context';

export const useSystemProperties = (): ISystemProperties | null => {
  return useContext(SubstraHooksContext).systemProperties;
};
