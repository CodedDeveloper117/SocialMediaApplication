import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../utils/client";

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
        console.log("Hello", image);
        const doc = {
          _type: "post",
          title,
          about,
          destination,
          image: {
            _type: "figure",
            alt: imageAsset.file.name,
            image: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: image?._id,
              },
            },
          },
          userId: userID,
          author: {
            _type: "author",
            _ref: userID,
          },
          category,
        };
        const uploadedDoc = await client.create(doc);
        console.log(image, uploadedDoc);
  
        return fulfillWithValue(uploadedDoc);
      } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility
        return rejectWithValue(err);
      }
    }
  );