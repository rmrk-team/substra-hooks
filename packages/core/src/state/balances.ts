import { mergeRight } from 'ramda';
import { BalanceReturnType } from '../helpers';
import { ActionMap } from '../types/reducer';

export interface BalancesState {
  balances: Record<string, BalanceReturnType>;
  assets: Record<string, Record<string, BalanceReturnType>>;
}

export enum BalanceTypes {
  SET_BALANCE = 'SET_BALANCE',
  SET_ASSET = 'SET_ASSET',
}

type BalancesPayload = {
  [BalanceTypes.SET_BALANCE]: {
    balance: BalanceReturnType;
    network: string;
  };
  [BalanceTypes.SET_ASSET]: {
    balance: BalanceReturnType;
    network: string;
    assetId: number;
  };
};

export type BalancesActions = ActionMap<BalancesPayload>[keyof ActionMap<BalancesPayload>];

export const balancesReducer = (state: BalancesState, action: BalancesActions) => {
  switch (action.type) {
    case BalanceTypes.SET_BALANCE:
      return mergeRight(state, {
        balances: mergeRight(state.balances, { [action.payload.network]: action.payload.balance }),
      });

    case BalanceTypes.SET_ASSET:
      return mergeRight(state, {
        assets: mergeRight(state.assets, {
          [action.payload.network]: mergeRight(state.assets[action.payload.network] || {}, {
            [action.payload.assetId]: action.payload.balance,
          }),
        }),
      });

    default:
      return state;
  }
};
