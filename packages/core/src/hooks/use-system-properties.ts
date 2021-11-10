import { useContext } from 'react';
import { ISystemProperties } from '../types/system-properties';
import { SubstraHooksContext } from '../providers/substrahooks-provider/context';
import { systemPropertiesDefaults } from '../helpers';

export const useSystemProperties = (apiProviderId?: string): ISystemProperties => {
  const id = apiProviderId || useContext(SubstraHooksContext).defaultApiProviderId;
  return (
    useContext(SubstraHooksContext).apiProviders[id]?.systemProperties || systemPropertiesDefaults
  );
};
