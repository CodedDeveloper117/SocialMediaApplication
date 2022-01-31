import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../utils/client";
import { getPostsByCategory, getPostsQuery } from "../../../utils/data";

export const getPosts = createAsyncThunk(
    "user/getPosts",
    async ({ from, to, refresh, category }, { rejectWithValue, fulfillWithValue }) => {
      //console.log(postData)
      try {
        if(category) {
          const query = getPostsByCategory(category, from, to)
          const posts = await client.fetch(query)
          console.log(posts)
          return fulfillWithValue({posts, refresh, category})
        }
        const query = getPostsQuery(from, to)
        const posts = await client.fetch(query);
        console.log(posts);
  
        return fulfillWithValue({posts, refresh});
      } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility
        console.log(err.response.body.error)
        return rejectWithValue(err.response.body.error);
      }
    }
  );