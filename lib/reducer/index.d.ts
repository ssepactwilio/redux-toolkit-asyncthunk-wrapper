import { IFetchingState, IReducerState } from "../global.types";
import { ICreateReducerInput } from "./index.types";
export declare const fetchingState: IFetchingState;
export declare const fetchingStates: {
    initial: {
        fetching: boolean;
        fetchingSuccess: boolean;
        fetchingFailure: boolean;
        data: never[];
    };
    fetching: {
        fetching: boolean;
        fetchingSuccess: boolean;
        fetchingFailure: boolean;
    };
    success: {
        fetchingSuccess: boolean;
        fetching: boolean;
        fetchingFailure: boolean;
    };
    failure: {
        fetchingFailure: boolean;
        fetching: boolean;
        fetchingSuccess: boolean;
    };
};
declare const createReducer: (states: ICreateReducerInput<any, any>[]) => import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<IReducerState>;
export default createReducer;
