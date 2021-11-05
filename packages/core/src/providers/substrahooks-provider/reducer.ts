import { ISystemProperties } from '../../types/system-properties';
import { merge } from 'ramda';

interface SubstraHooksReducer {
  systemProperties: ISystemProperties;
}

export function substraHooksReducer(
  state: SubstraHooksReducer,
  action: Partial<SubstraHooksReducer>,
): SubstraHooksReducer {
  return merge(state, action);
}
