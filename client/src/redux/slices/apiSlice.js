import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const apiPOST = createAsyncThunk(
  "api/post",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`/${payload.path}`, payload.formData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message.payload });
    }
  }
);

export const apiGET = createAsyncThunk("api/get", async (path, thunkAPI) => {
  try {
    const response = await axios.get(`/api/${path}`);

    return await response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const apiPUT = createAsyncThunk("api/put", async (payload, thunkAPI) => {
  try {
    const response = await axios.put(`/api/${payload.path}`, payload.formData);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const apiDELETE = createAsyncThunk(
  "api/delete",
  async (path, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/${path}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const apiSlice = createSlice({
  name: "api",
  initialState: {},
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(apiGET.pending, (state, { meta }) => {
        const { arg } = meta;
        state[arg] = {};
        state[arg].status = "fetching";
      })
      .addCase(apiGET.fulfilled, (state, { payload, meta }) => {
        const { arg } = meta;

        state[arg].status = "done";
        state[arg] = { ...payload };
      })
      .addCase(apiPOST.fulfilled, (state, { payload, meta }) => {
        const { path } = meta.arg;
        const length = Object.values(state[path] || {}).length;

        state[path] = { ...state[path], [length]: payload };
      })
      .addCase(apiDELETE.fulfilled, (state, { payload, meta }) => {
        const { arg } = meta;
        const path = arg.split("/")[0];
        const deletedId = arg.split("/")[1];

        state[path] = {
          ...Object.values(state[path]).filter((stateItem) => {
            return stateItem._id !== deletedId;
          }),
        };
      })
      .addCase(apiPUT.fulfilled, (state, { payload, meta }) => {
        const rgx = /\/.*/g;
        const { arg } = meta;
        const path = arg.path.replace(rgx, "");
        const { dataToUpdate } = payload;

        state[path] = {
          ...Object.values(state[path]).map((stateItem) =>
            stateItem._id === dataToUpdate._id ? dataToUpdate : stateItem
          ),
        };
      });
  },
});

export const { increment, decrement, incrementByAmount } = apiSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getApiResource = (state, path) => state.api[path] || {};

export default apiSlice.reducer;
