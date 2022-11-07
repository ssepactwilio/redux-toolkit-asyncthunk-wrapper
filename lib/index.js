"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const fetchingState = {
    fetching: false,
    fetchingSuccess: false,
    fetchingFailure: false,
};
const fetchingStates = {
    initial: Object.assign({ data: [] }, fetchingState),
    fetching: Object.assign(Object.assign({}, fetchingState), { fetching: true }),
    success: Object.assign(Object.assign({}, fetchingState), { fetchingSuccess: true }),
    failure: Object.assign(Object.assign({}, fetchingState), { fetchingFailure: true }),
};
const fastReduce = (stateKey, asyncThunk, builder, options = {}) => builder
    .addCase(asyncThunk.pending, (state, { payload }) => (Object.assign(Object.assign({}, state), { [stateKey]: Object.assign(Object.assign({}, state[stateKey]), fetchingStates.fetching) })))
    .addCase(asyncThunk.fulfilled, (state, { payload }) => (Object.assign(Object.assign({}, state), { [stateKey]: Object.assign(Object.assign(Object.assign({}, state[stateKey]), fetchingStates.success), { data: typeof options.payloadTransformer === "function"
            ? options.payloadTransformer(payload)
            : payload }) })))
    .addCase(asyncThunk.rejected, (state, { payload }) => (Object.assign(Object.assign({}, state), { [stateKey]: Object.assign(Object.assign({}, state[stateKey]), fetchingStates.failure) })));
const createReducer = (states) => {
    const initialState = states.reduce((obj, { stateName, options }) => {
        var _a;
        return Object.assign(obj, {
            [stateName]: Object.assign(Object.assign({}, fetchingStates.initial), { data: (_a = options === null || options === void 0 ? void 0 : options.initialState) !== null && _a !== void 0 ? _a : [] }),
        });
    }, {});
    return (0, toolkit_1.createReducer)(initialState, (builder) => {
        states.forEach(({ stateName, asyncThunk, options }) => {
            fastReduce(stateName, asyncThunk, builder, {
                payloadTransformer: options === null || options === void 0 ? void 0 : options.payloadTransformer,
            });
        });
        return builder;
    });
};
exports.default = createReducer;
