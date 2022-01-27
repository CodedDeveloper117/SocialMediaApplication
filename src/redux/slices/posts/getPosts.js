import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../utils/client";
import { getPostsQuery } from "../../../utils/data";

export const getPosts = createAsyncThunk(
    "user/getPosts",
    async ({ pageSize }, { rejectWithValue, fulfillWithValue }) => {
      //console.log(postData)
      try {
        const query = getPostsQuery(pageSize)
        const posts = await client.fetch(query);
        console.log(posts);
  
        return fulfillWithValue(posts);
      } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility
        console.log(err.response.body.error)
        return rejectWithValue(err.response.body.error);
      }
    }
  );