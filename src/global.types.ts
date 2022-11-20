export interface IFetchingState {
  fetching: boolean;
  fetchingSuccess: boolean;
  fetchingFailure: boolean;
}

export interface IReducerState {
  [key: string]: IInitialState;
}

export type IInitialState = IFetchingState & { data: any };
