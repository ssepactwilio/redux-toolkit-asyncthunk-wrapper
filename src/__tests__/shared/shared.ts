import { createAsyncThunk } from "@reduxjs/toolkit";
import { IReducerState } from "../../global.types";
import { fetchingStates } from "../../reducer";
export const testState: IReducerState = {
  state1: {
    ...fetchingStates.initial,
  },
  state2: {
    ...fetchingStates.initial,
  },
  state3: {
    ...fetchingStates.initial,
  },
};
export const testAsyncThunk = (thunkName: string, val?: string) =>
  createAsyncThunk(thunkName, async (_, { rejectWithValue }) => {
    try {
      await new Promise<string | undefined>((resolve) => {
        setTimeout(() => resolve(val), 0);
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  });

export const testRejectingAsyncThunk = (thunkName: string, val?: string) =>
  createAsyncThunk(thunkName, async (_, { rejectWithValue }) => {
    try {
      await new Promise<string | undefined>((resolve, reject) => {
        setTimeout(() => reject(val), 0);
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  });

  export const asyncThunkCollection = [
    {
      asyncThunk: testAsyncThunk("1", "value1"),
      stateName: "state1",
    },
    {
      asyncThunk: testAsyncThunk("2", "value2"),
      stateName: "state2",
    },
    {
      asyncThunk: testRejectingAsyncThunk("3", "value3"),
      stateName: "state3",
    },
  ];