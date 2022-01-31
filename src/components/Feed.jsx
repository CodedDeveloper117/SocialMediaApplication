import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPosts } from "../redux/slices/posts/getPosts";
import { client } from "../utils/client";
import { getPostsByCategory, getPostsQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.posts);
  const [fetchNextPage, setFetchNextPage] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);

  const initPosts = () => {
    if (categoryId) {
      console.log(categoryId);
      dispatch(
        getPosts({
          from: 0,
          to: 30,
          refresh: true,
          category: categoryId,
        })
      );
    }
    if (categoryId === undefined) {
      dispatch(
        getPosts({
          from: 0,
          to: 30,
          refresh: true,
        })
      );
    }
  };

  useEffect(() => {
    initPosts();
  }, [categoryId]);

  useEffect(() => {
    if (state.posts.length > 0) {
      setPosts(state.posts);
    }
  }, [state]);

  const getMorePosts = () => {
    if (!lastPageReached) {
      setFetchNextPage(true);
      if (categoryId === undefined) {
        const query = getPostsQuery(posts.length, posts.length + 20);
        client
          .fetch(query)
          .then((data) => {
            console.log(data);
            if (data.length === 0) {
              setLastPageReached(true);
            }
            setPosts((state) => [...state, ...data]);
            setFetchNextPage(false);
          })
          .catch((e) => {
            console.log(e.message);
          });
      } else {
        const query = getPostsByCategory(
          categoryId,
          posts.length,
          posts.length + 20
        );
        client
          .fetch(query)
          .then((data) => {
            console.log(data);
            if (data.length === 0) {
              setLastPageReached(true);
            }
            setPosts((state) => [...state, ...data]);
            setFetchNextPage(false);
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    }
  };

  if (state.loading)
    return (
      <div
        className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <Spinner message="Please wait while we fetch your posts..." />
      </div>
    );

  if (state.error && !state.loading)
    return (
      <div
        className="flex items-center justify-center w-full h-full z-50"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <p>{state.error}</p>
      </div>
    );

  if (state.posts.length === 0 && !state.loading)
    return (
      <div
        className="flex items-center justify-center w-full h-full z-50"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <p>Feeds are Empty...</p>
      </div>
    );

  return (
    <div>
      <MasonryLayout
        posts={state.posts}
        refresh={initPosts}
        getMorePosts={getMorePosts}
      />
      {fetchNextPage && (
        <div className="max-h-100 mt-4">
          <Spinner message="Please wait..." />
        </div>
      )}
    </div>
  );
};

export default Feed;
