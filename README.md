# Redux-Toolkit-Asyncthunk-Wrapper

Removes boilerplate code surrounding setting up AsyncThunks with Redux Toolkit by managing state surrounding the promise lifecycle.

## Usage

First, create an AsyncThunk as you normally would.

```
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const testAsyncThunk = createAsyncThunk("[Test]", async (params) => {
  const data = await axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((resp) => resp.data);
  return data;
});
```

Then, when you create your Redux store, use the `createReducer` method of `redux-toolkit-asyncthunk-wrapper` to create reducers for you.


```
import { configureStore } from "@reduxjs/toolkit";
import createReducer from "redux-toolkit-asyncthunk-wrapper";
import { testAsyncThunk } from "./actions";

export default configureStore({
  reducer: createReducer([{ stateName: "test", asyncThunk: testAsyncThunk, options:{
    payloadTransformer: (payload)=>{
        console.log("I can modify the payload from a successful promise here.")
        return payload.userId
    },
    initialState: 0
  } }]),
});
```

That's it. The Redux store would look like this before and after running the code above:

```
//before
test: {
    data: 0,
    fetching: true,
    fetchingSuccess: false,
    fetchingFailure: false
}

//after
test: {
    data: 1,
    fetching: false,
    fetchingSuccess: true,
    fetchingFailure: false
}
```


### Using `createReducer`

The method signature of `createReducer` requires a single argument; an array of objects of the following type:
```
interface IReducerArg = {
    asyncThunk: AsyncThunk;
    options:IReducerOptions;
    stateName: string;
}

interface IReducerOptions = {
    initialState: any;
    payloadTransformer: (payload:any)=>any;
}
```