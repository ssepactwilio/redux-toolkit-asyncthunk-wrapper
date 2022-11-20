import { AnyAction, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { IInitialState, IReducerState } from "../global.types";

type ISelector = (appState: IReducerState) => any;

type ISelectorSlice = {
  [str in keyof IInitialState]: ISelector;
};

interface ISelectorCache {
  [key: string]: ISelectorSlice;
}

type IStore = EnhancedStore<
  IReducerState,
  AnyAction,
  [ThunkMiddleware<IReducerState, AnyAction, undefined>]
>;

export const createSelectors = (store: IStore, slice?: string) =>
  Object.keys(store.getState()).reduce<ISelectorCache>(
    (selectorAcc: ISelectorCache, curr: string) => {
      const fetching: ISelector = (state: IReducerState) =>
        state[curr].fetching;
      const fetchingFailure: ISelector = (state: IReducerState) =>
        state[curr].fetchingFailure;
      const fetchingSuccess: ISelector = (state: IReducerState) =>
        state[curr].fetchingSuccess;
      const data: ISelector = (state: IReducerState) => state[curr].data;

      const selectors: ISelectorSlice = {
        fetching,
        fetchingFailure,
        fetchingSuccess,
        data,
      };

      return !slice
        ? {
            ...selectorAcc,
            [curr]: selectors,
          }
        : {
            ...selectorAcc,
            [slice]: {
              ...selectorAcc[slice],
              [curr]: selectors,
            },
          };
    },
    {}
  );
