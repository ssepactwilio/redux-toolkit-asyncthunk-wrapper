import { AsyncThunk } from "@reduxjs/toolkit";

export interface ICreateReducerInput<T, R> {
  asyncThunk: AsyncThunk<T, any, any>;
  options?: IReduceOptions<T, R>;
  stateName: string;
}

export interface IReduceOptions<T, R> {
  initialState?: any;
  payloadTransformer?: (input: T) => R;
}

export interface IFetchingState {
  fetching: boolean;
  fetchingSuccess: boolean;
  fetchingFailure: boolean;
}

export interface IReducerState {
  [key: string]: IInitialState;
}

export type IInitialState = IFetchingState & { data: any };
