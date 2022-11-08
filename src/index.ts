import { ActionReducerMapBuilder, AsyncThunk, createReducer as reduxToolkitCreateReducer } from "@reduxjs/toolkit";
import { ICreateReducerInput, IFetchingState, IReduceOptions, IReducerState } from "./index.types";

const fetchingState:IFetchingState = {
  fetching: false,
  fetchingSuccess: false,
  fetchingFailure: false,
};
const fetchingStates = {
  initial: {
    data: [],
    ...fetchingState,
  },
  fetching: {
    ...fetchingState,
    fetching: true,
  },
  success: {
    ...fetchingState,
    fetchingSuccess: true,
  },
  failure: {
    ...fetchingState,
    fetchingFailure: true,
  },
};

const fastReduce = (stateKey:string, asyncThunk:AsyncThunk<any,any,any>, builder:ActionReducerMapBuilder<{}>, options:IReduceOptions<any,any> = {}) =>
  builder
    .addCase(asyncThunk.pending, (state, { payload }) => ({
      ...state,
      [stateKey]: {
        ...(state as any)[stateKey],
        ...fetchingStates.fetching,
      },
    }))
    .addCase(asyncThunk.fulfilled, (state, { payload }) => ({
      ...state,
      [stateKey]: {
        ...(state as any)[stateKey],
        ...fetchingStates.success,
        data:
          typeof options.payloadTransformer === "function"
            ? options.payloadTransformer(payload)
            : payload,
      },
    }))
    .addCase(asyncThunk.rejected, (state, { payload }) => ({
      ...state,
      [stateKey]: {
        ...(state as any)[stateKey],
        ...fetchingStates.failure,
      },
    }));

const createReducer = (states:ICreateReducerInput<any,any>[]) => {
  const initialState = states.reduce<IReducerState>(
    (obj, { stateName, options }) =>
      Object.assign(obj, {
        [stateName]: {
          ...fetchingStates.initial,
          data: options?.initialState ?? [],
        },
      }),
    {}
  );

  return reduxToolkitCreateReducer(initialState, (builder) => {
    states.forEach(({ stateName, asyncThunk, options }) => {
      fastReduce(stateName, asyncThunk, builder, {
        payloadTransformer: options?.payloadTransformer,
      });
    });
    return builder;
  });
};

export default createReducer