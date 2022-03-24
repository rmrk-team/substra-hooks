import { useContext } from 'react';
import { ISystemProperties } from '../types/system-properties';
import {
  SubstraHooksContext,
  useApiProvidersState,
} from '../providers/substrahooks-provider/context';
import { systemPropertiesDefaults } from '../helpers';

export const useSystemProperties = (apiProviderId?: string): ISystemProperties => {
  const id = apiProviderId || useContext(SubstraHooksContext).defaultApiProviderId;
  return useApiProvidersState().apiProviders[id]?.systemProperties || systemPropertiesDefaults;
};
