import { ICreateReducerInput } from "./index.types";
declare const createReducer: (states: ICreateReducerInput<any, any>[]) => import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<{}>;
export default createReducer;
