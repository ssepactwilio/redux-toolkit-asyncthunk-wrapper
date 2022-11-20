import createReducer from ".."
import { asyncThunkCollection, testState } from "./shared/shared";
import { cloneDeep, isEqual } from "lodash";
import { configureStore } from "@reduxjs/toolkit";

describe("createReducer initialization", () => {
  test("createReducer produced non-null value", () => {
    const reducer = createReducer(asyncThunkCollection);

    expect(reducer).not.toBe(null);
  });

  test("createReducer produces expected initial state", () => {
    const reducer = createReducer(asyncThunkCollection);

    expect(isEqual(reducer.getInitialState(), testState)).toBe(true);
  });
});

describe("Promise lifecycle fields are correct in the reducer.", () => {
  test("Store values change after dispatch", async () => {
    const reducer = createReducer(asyncThunkCollection);

    const store = configureStore({ reducer });
    const storePrev = cloneDeep(store.getState());

    await store.dispatch(asyncThunkCollection[0].asyncThunk());
    const storeAfter = cloneDeep(store.getState());

    expect(isEqual(storePrev, storeAfter)).not.toBe(true);
  });

  test("Successful dispatch result handled correctly", async () => {
    const reducer = createReducer(asyncThunkCollection);

    const store = configureStore({ reducer });
    await store.dispatch(asyncThunkCollection[0].asyncThunk());
    const storeAfter = cloneDeep(store.getState());

    expect(storeAfter["state1"].data === "value1");
    expect(storeAfter['state1'].fetchingSuccess === true)
  });

  test("Rejected dispatch result handled correctly", async () => {
    const reducer = createReducer(asyncThunkCollection);

    const store = configureStore({ reducer });
    await store.dispatch(asyncThunkCollection[2].asyncThunk());
    const storeAfter = cloneDeep(store.getState());

    expect(storeAfter['state3'].fetchingFailure === true)
  });
});
