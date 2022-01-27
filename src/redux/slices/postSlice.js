import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../utils/client";
import { createPost } from "./posts/createPost";
import { getPosts } from "./posts/getPosts";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    data: null,
    loading: false,
    error: null,
    currentRequestId: "",
    posts: [],
    createOperationSuccess: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
          state.createOperationSuccess = false;
        }
      })
      .addCase(createPost.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.data = action.payload;
          state.currentRequestId = "";
          state.createOperationSuccess = true;
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.error = { ...action.error, err: action.payload };
          state.currentRequestId = "";
          state.createOperationSuccess = false;
        }
      })
      .addCase(getPosts.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
          state.error = null
        }
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = "";
          state.posts.push(...action.payload)
          state.error = null
        }
      })
      .addCase(getPosts.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.error = { ...action.error, ...action.payload };
          state.currentRequestId = "";
          
        }
      });
  },
});

export default postSlice.reducer;
