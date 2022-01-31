import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../utils/client";
import { userQuery } from "../../utils/data";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue, fulfillWithValue, dispatch }) => {
    //const { id, ...fields } = userData
    try {
      const { name, googleId, imageUrl, familyName, givenName } = userData;
      const doc = {
        _id: googleId,
        _type: "user",
        username: name,
        image: imageUrl,
        bio: `Hello my name is ${name} and I'm using this awesome application, you should check it out`,
        firstname: givenName,
        lastname: familyName,
      };
      const user = await client.createOrReplace(doc);
      localStorage.setItem("userID", user._id);
      return fulfillWithValue(user)
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err);
    }
  }
);

export const getUser = createAsyncThunk(
    "user/getUser",
    async (userId, { rejectWithValue, fulfillWithValue, dispatch }) => {
      const query = userQuery(userId)
      try {
        const user = await client.fetch(query);
        if(user.length !== 0) {
          return fulfillWithValue(user[0])
        }
        return rejectWithValue("user doesn't exist")
      } catch (err) {
        if(err.isNetworkError) {
          console.log(err.isNetworkError)
          return rejectWithValue("Network Error")
        }
        console.log(err)
        return rejectWithValue(err);
      }
    }
  );

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
    currentRequestId: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading &&
          state.currentRequestId === requestId
        ) {
          state.loading = false
          state.data = action.payload
          state.currentRequestId = ''
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading &&
          state.currentRequestId === requestId
        ) {
          state.loading = false
          state.error = action.error
          state.currentRequestId = ''
        }
      })
      .addCase(getUser.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading &&
          state.currentRequestId === requestId
        ) {
          state.loading = false
          state.data = action.payload
          state.currentRequestId = ''
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading &&
          state.currentRequestId === requestId
        ) {
          state.loading = false
          state.error = { ...action.error, err: action.payload }
          state.currentRequestId = ''
        }
      })
    }
});

export default userSlice.reducer;
