import React, { useEffect, useState } from "react";
import { searchQuery } from "../utils/data";
import { client } from "../utils/client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchNextPage, setFetchNextPage] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false)

  const getPostsData = () => {
    if (searchTerm !== "") {
      setLoading(true);
      const query = searchQuery(searchTerm, posts.length, 20);
      client
        .fetch(query)
        .then((data) => {
          console.log(data);
          setPosts(data);
          setLoading(false);
          setError(null);
        })
        .catch((e) => {
          console.log(e.message);
          setPosts([]);
          setLoading(false);
          setError(e.message);
        });
    }
  };

  useEffect(() => {
    getPostsData();
  }, [searchTerm]);

  const getMorePosts = () => {
    if (searchTerm !== "" && !lastPageReached) {
      setFetchNextPage(true);
      const query = searchQuery(searchTerm, posts.length, posts.length + 20);
      client
        .fetch(query)
        .then((data) => {
          console.log(data);
          if(data.length === 0) {
            setLastPageReached(true)
          }
          setPosts(state => [...state, ...data]);
          setFetchNextPage(false);
          setError(null);
        })
        .catch((e) => {
          console.log(e.message);
          setError(e.message);
        });
    }
  };

  if(loading) {
    return (
      <div
          className="absolute top-0 left-0 w-full h-full z-50"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        >
          <Spinner message="Please wait while we get your posts..." />
        </div>
    )
  }

  return (
    <div className="w-full h-full">
      <MasonryLayout
        posts={posts}
        refresh={() => getPostsData()}
        getMorePosts={getMorePosts}
      />
      {fetchNextPage && (
        <div className="max-h-100 mt-4">
        <Spinner message="Please wait... Adding more posts" />
        </div>
      )}
    </div>
  );
};

export default Search;
