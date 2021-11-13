import { merge } from 'ramda';
import { BalanceReturnType } from '../../helpers';
import { ActionMap } from '../../types/reducer';
import { BalancesState } from './context';

export enum BalanceTypes {
  SET_BALANCE = 'SET_BALANCE',
}

type BalancesPayload = {
  [BalanceTypes.SET_BALANCE]: {
    balance: BalanceReturnType;
    network: string;
  };
};

export type BalancesActions = ActionMap<BalancesPayload>[keyof ActionMap<BalancesPayload>];

export const balancesReducer = (state: BalancesState, action: BalancesActions) => {
  switch (action.type) {
    case BalanceTypes.SET_BALANCE:
      return merge(state, {
        balances: merge(state.balances, { [action.payload.network]: action.payload.balance }),
      });

    default:
      return state;
  }
};
