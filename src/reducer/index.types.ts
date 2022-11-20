import { AsyncThunk } from "@reduxjs/toolkit";
import { IFetchingState } from "../global.types";

export interface ICreateReducerInput<T, R> {
  asyncThunk: AsyncThunk<T, any, any>;
  options?: IReduceOptions<T, R>;
  stateName: string;
}

export interface IReduceOptions<T, R> {
  initialState?: any;
  payloadTransformer?: (input: T) => R;
}
