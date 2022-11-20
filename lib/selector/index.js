"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSelectors = void 0;
const createSelectors = (store, slice) => Object.keys(store.getState()).reduce((selectorAcc, curr) => {
    const fetching = (state) => state[curr].fetching;
    const fetchingFailure = (state) => state[curr].fetchingFailure;
    const fetchingSuccess = (state) => state[curr].fetchingSuccess;
    const data = (state) => state[curr].data;
    const selectors = {
        fetching,
        fetchingFailure,
        fetchingSuccess,
        data,
    };
    return !slice
        ? Object.assign(Object.assign({}, selectorAcc), { [curr]: selectors }) : Object.assign(Object.assign({}, selectorAcc), { [slice]: Object.assign(Object.assign({}, selectorAcc[slice]), { [curr]: selectors }) });
}, {});
exports.createSelectors = createSelectors;
