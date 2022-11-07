import { AsyncThunk } from "@reduxjs/toolkit"


export interface ICreateReducerInput<T,R> {

    asyncThunk:AsyncThunk<any,any,any>
    options?:IReduceOptions<T,R>
    stateName:string
}

export interface IReduceOptions<T, R> {
    initialState?: R
    payloadTransformer?: (input:T)=>R
}