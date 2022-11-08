import { ICreateReducerInput, IReducerState } from "./index.types";
declare const createReducer: (states: ICreateReducerInput<any, any>[]) => import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<IReducerState>;
export default createReducer;
