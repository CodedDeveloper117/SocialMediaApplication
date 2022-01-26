import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../utils/client";

export const createPost = createAsyncThunk(
  "user/createPost",
  async (postData, { rejectWithValue, fulfillWithValue, dispatch }) => {
    const { userID, title, about, destination, imageAsset, category } =
      postData;
    //console.log(postData)
    try {
      const image = await client.assets.upload("image", imageAsset.file, {
        contentType: imageAsset.file.type,
        filename: imageAsset.file.name,
      });
      console.log("Hello", image)
      const doc = {
        _type: "post",
        title,
        about,
        destination,
        imageUrl: image?.url,
        userId: userID,
        author: {
          _type: "author",
          _ref: userID,
        },
        category,
      };
      const uploadedDoc = await client.create(doc);
      console.log(image, uploadedDoc)

      return fulfillWithValue(uploadedDoc);
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    data: null,
    loading: false,
    error: "",
    currentRequestId: "",
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(createPost.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.data = action.payload;
          state.currentRequestId = "";
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.error = action.error;
          state.currentRequestId = "";
        }
      });
  },
});

export default postSlice.reducer;
