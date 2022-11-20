import { AnyAction, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { IInitialState, IReducerState } from "../global.types";
declare type ISelector = (appState: IReducerState) => any;
declare type ISelectorSlice = {
    [str in keyof IInitialState]: ISelector;
};
interface ISelectorCache {
    [key: string]: ISelectorSlice;
}
declare type IStore = EnhancedStore<IReducerState, AnyAction, [
    ThunkMiddleware<IReducerState, AnyAction, undefined>
]>;
export declare const createSelectors: (store: IStore, slice?: string) => ISelectorCache;
export {};
