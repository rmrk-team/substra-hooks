import { mergeRight } from 'ramda';
import { ActionMap } from '../types/reducer';

export interface ErrorsState {
  blockSyncErrors: {
    [network: string]: Error | undefined;
  };
}

export enum ErrorActionTypes {
  BLOCK_SYNC_ERROR = 'BLOCK_SYNC_ERROR',
}

type ErrorsPayload = {
  [ErrorActionTypes.BLOCK_SYNC_ERROR]: {
    network: string;
    error?: Error;
  };
};

export type ErrorsActions = ActionMap<ErrorsPayload>[keyof ActionMap<ErrorsPayload>];

export const errorsReducer = (state: ErrorsState, action: ErrorsActions) => {
  switch (action.type) {
    case ErrorActionTypes.BLOCK_SYNC_ERROR:
      return mergeRight(state, {
        blockSyncErrors: mergeRight(state.blockSyncErrors, {
          [action.payload.network]: action.payload.error,
        }),
      });

    default:
      return state;
  }
};
