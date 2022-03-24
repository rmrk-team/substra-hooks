import { merge } from 'ramda';
import { ApiProvider, ProvidersState } from './context';
import { ActionMap } from '../../types/reducer';

export enum Types {
  SET_PROVIDER = 'SET_PROVIDER',
  SET_PROVIDERS = 'SET_PROVIDERS',
}

type ProvidersPayload = {
  [Types.SET_PROVIDERS]: {
    apiProviders: ProvidersState['apiProviders'];
  };
  [Types.SET_PROVIDER]: {
    provider: ApiProvider;
    id: string
  };
};

export type ProvidersActions = ActionMap<ProvidersPayload>[keyof ActionMap<ProvidersPayload>];

export const providersReducer = (state: ProvidersState, action: ProvidersActions) => {
  switch (action.type) {
    case Types.SET_PROVIDERS:
      return merge(state, { apiProviders: action.payload.apiProviders });

    case Types.SET_PROVIDER:
      return merge(state, { apiProviders: {...state.apiProviders, [action.payload.id]: action.payload.provider} });

    default:
      return state;
  }
};
