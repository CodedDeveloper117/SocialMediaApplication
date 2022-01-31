import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPosts } from "../redux/slices/posts/getPosts";
import { client } from "../utils/client";
import { getPostsByCategory } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.posts);

  const refresh = () => {
    dispatch(getPosts({ pageSize: 30, refresh: true }))
  }
  console.log(categoryId)

  useEffect(() => {
    if (categoryId) {
      console.log(categoryId)
      dispatch(getPosts({ pageSize: 30, refresh: true, category: categoryId }))
    } else {
      dispatch(getPosts({ pageSize: 30, refresh: true }));
    }
  }, [categoryId]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  if (state.loading)
    return (
      <div
        className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <Spinner message="Please wait while we fetch your posts..." />
      </div>
    );

  if(state.error && !state.loading) 
  return (
    <div
        className="flex items-center justify-center w-full h-full z-50"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <p>{state.error}</p>        
      </div>
  )

  if(state.posts.length === 0 && !state.loading) 
  return (
    <div
        className="flex items-center justify-center w-full h-full z-50"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <p>Feeds are Empty...</p>        
      </div>
  )

  return (
    <div>
      <MasonryLayout posts={state.posts} refresh={refresh} />
    </div>
  );
};

export default Feed;
