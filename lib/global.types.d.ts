export interface IFetchingState {
    fetching: boolean;
    fetchingSuccess: boolean;
    fetchingFailure: boolean;
}
export interface IReducerState {
    [key: string]: IInitialState;
}
export declare type IInitialState = IFetchingState & {
    data: any;
};
