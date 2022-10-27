import { createReducer as reduxToolkitCreateReducer } from "@reduxjs/toolkit";

const fetchingState = {
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

/** @type {(stateKey:string, asyncThunk:AsyncThunk, builder:ActionReducerMapBuilder, options: {payloadTransformer:(payload:any)})} */
const fastReduce = (stateKey, asyncThunk, builder, options = {}) =>
  builder
    .addCase(asyncThunk.pending, (state, { payload }) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
        ...fetchingStates.fetching,
      },
    }))
    .addCase(asyncThunk.fulfilled, (state, { payload }) => ({
      ...state,
      [stateKey]: {
        ...state[stateKey],
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
        ...state[stateKey],
        ...fetchingStates.failure,
      },
    }));

const createReducer = (states) => {
  const initialState = states.reduce(
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