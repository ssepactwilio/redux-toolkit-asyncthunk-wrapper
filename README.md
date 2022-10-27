# Redux-Toolkit-Asyncthunk-Wrapper

Removes boilerplate code surrounding setting up AsyncThunks with Redux Toolkit by managing state surrounding the promise lifecycle.

## Usage

First, create an AsyncThunk as you normally would.

```
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchTodos = createAsyncThunk("Fetch Todos", async (params) => {
  const data = await axios
    .get("https://jsonplaceholder.typicode.com/todos/")
    .then((resp) => resp.data);
  return data;
});

export const fetchPosts = createAsyncThunk("Fetch Posts", async (params) => {
  const data = await axios
    .get("https://jsonplaceholder.typicode.com/posts/")
    .then((resp) => resp.data);
  return data;
});
```

Then, when you create your Redux store, use the `createReducer` method of `redux-toolkit-asyncthunk-wrapper` to create reducers for you.


```
import { configureStore } from "@reduxjs/toolkit";
import createReducer from ".";
import { fetchPosts, fetchTodos } from "./actions";

const asyncThunkCollection = [
  {
    stateName: "todos",
    asyncThunk: fetchTodos,
    options: {
      payloadTransformer: (payload) => {
        console.log("I can modify the payload from a successful promise here.");
        return { count: payload.length };
      },
      initialState: [],
    },
  },
  {
    stateName: "posts",
    asyncThunk: fetchPosts,
    options: {},
  },
];

export default configureStore({
  reducer: createReducer(asyncThunkCollection),
});
```

The Redux store would look like this before and after running `testAsyncThunk`:

```
//before dispatch
{
  todos: {
    data: [],
    fetching: true,
    fetchingSuccess: false,
    fetchingFailure: false
  },
  posts: {
    data: [],
    fetching: true,
    fetchingSuccess: false,
    fetchingFailure: false
  }
}

//after dispatch
{
  todos: {
    data: {
      count: 200
    },
    fetching: false,
    fetchingSuccess: true,
    fetchingFailure: false
  },
  posts: {
    data: [...],
    fetching: false,
    fetchingSuccess: true,
    fetchingFailure: false
  }
}
```
That's it. Redux can be configured with two minimal blocks of code.


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