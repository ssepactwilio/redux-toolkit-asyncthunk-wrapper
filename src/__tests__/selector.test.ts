import { configureStore } from "@reduxjs/toolkit";
import createReducer, {createSelectors} from ".."
import { asyncThunkCollection } from "./shared/shared";
describe('Selectors', () => {
    test("Selectors are generated correctly", () => {
        const reducer = createReducer(asyncThunkCollection)

        const store = configureStore({ reducer });

        const state = store.getState()

        const selectors = createSelectors(store)

        expect(Object.keys(selectors).length === asyncThunkCollection.length)
        expect(selectors['state1'].fetching(state) === false)
        expect(selectors['state1'].fetchingFailure(state) === false)
        expect(selectors['state1'].fetchingSuccess(state) === false)
        expect(selectors['state1'].data(state) !== undefined)
        expect(selectors['state1'].data(state).length === 0)

    })

    test("Selectors update after dispatch", async () => {
        const reducer = createReducer(asyncThunkCollection)

        const store = configureStore({ reducer });
        await store.dispatch(asyncThunkCollection[0].asyncThunk());
        const state = store.getState()

        const selectors = createSelectors(store)

        expect(Object.keys(selectors).length === asyncThunkCollection.length)
        expect(selectors['state1'].fetching(state) === false)
        expect(selectors['state1'].fetchingFailure(state) === false)
        expect(selectors['state1'].fetchingSuccess(state) === true)
        expect(selectors['state1'].data(state) === "value1")

    })
})

