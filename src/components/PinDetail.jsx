import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { IoHeartOutline, IoHeart } from 'react-icons/io5'
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { client, urlFor } from "../utils/client";
import { getMorePostsQuery, getPostsQuery, postQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const PinDetail = () => {
  const { pinId } = useParams();
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user.data);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [postingComment, setPostingComment] = useState(false);
  const [posts, setPosts] = useState([])
  const [getPostsLoading, setGetPostsLoading] = useState(false)

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if(post) {
      getPosts()
    }
  }, [post])

  const getPosts = () => {
    const query = getMorePostsQuery(post, 30);
    setGetPostsLoading(true);
    client
      .fetch(query)
      .then((data) => {
        console.log(data)
        //setPosts(data);
        setGetPostsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }

  const getPost = () => {
    const query = postQuery(pinId);
    setLoading(true);
    client
      .fetch(query)
      .then((data) => {
        setPost(data[0]);
        setLoading(false);
        setError(null);

        setPostingComment(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        setPost(null);

        setPostingComment(false);
      });
  };

  const postComment = () => {
    if (comment) {
      setPostingComment(true);
      client
        .patch(post?._id)
        .setIfMissing({ comment: [] })
        .insert("after", "comment[-1]", [
          {
            _key: uuidV4(),
            comment: comment,
            author: {
              _type: "author",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then((data) => {
          getPost();
          setComment("");
        });
    }
  };

  if (loading && !post)
    return (
      <div
        className="w-full h-screen flex items-center justify-center"
        style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
      >
        <Spinner message="Please wait while we get post information..." />
      </div>
    );

  if (error && !loading)
    return (
      <div
        className="w-full h-screen flex items-center justify-center"
        style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
      >
        <p className="font-bold text-sm">Error</p>
      </div>
    );

  return (
    <>
      <div className="flex gap-2 rounded-lg flex-col bg-white mt-2 p-2 custom-scrollbar">
        <div className="flex justify-center items-center flex-1 ">
          {post && (
            <img
              className="rounded-lg mt-2 ml-2 object-cover"
              src={urlFor(post?.image?.image?.asset?.url).width(450).url()}
              alt="user-post"
            />
          )}
        </div>
        <div className="mt-2 mr-2 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <a
                href={``}
                download
                className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={""} target="_blank" rel="noreferrer">
              {post?.destination}
            </a>
          </div>
          <div>
            <h1 className="text-lg font-bold break-words mt-2">
              {post?.title}
            </h1>
            <p className="mt-2 text-md">{post?.about}</p>
          </div>
          <Link
            to={`/user-profile/${user._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg "
          >
            <img
              src={post?.author?.image}
              className="w-40 h-40 rounded-full"
              alt="user-profile"
            />
            <p className="font-bold text-sm">{post?.author?.username}</p>
          </Link>
        </div>
      </div>
      <h2 className="mt-2 text-md font-bold">Comments</h2>
      <div className="p-2 max-h-370 overflow-y-scroll custom-scrollbar2">
        {post?.comment?.map((item, index) => (
          <div
            className="flex gap-2 mt-2 items-center bg-white rounded-lg p-2"
            key={item._key}
          >
            <img
              src={item?.author.image}
              className="w-40 h-40 rounded-full cursor-pointer"
              alt="user-profile"
            />
            <div className="flex flex-col">
              <p className="font-bold text-sm">{item?.author.username}</p>
              <p className="text-sm">{item?.comment}</p>
            </div>
          </div>
        ))}
        {(post?.comment?.length === 0 || !post?.comment) && (
          <p
            className="font-bold text-sm hover:text-blue self-end inline-block cursor-pointer"
            onClick={() => {}}
          >
            No Comments for this posts
          </p>
        )}
        {post?.comment?.length > 8 && (
          <p
            className="font-bold text-sm hover:text-blue self-end inline-block cursor-pointer"
            onClick={() => {}}
          >
            See more...
          </p>
        )}
      </div>
      <div className="flex mt-2 gap-3">
        <Link to={`/user-profile/`}>
          <img
            src={post?.author.image}
            className="w-10 h-10 rounded-full cursor-pointer"
            alt="user-profile"
          />
        </Link>
        <input
          className="text-sm flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
          type="text"
          placeholder="Add a comment"
          value={comment}
          required
          onChange={(e) => setComment(e.target.value)}
        />
        {postingComment ? (
          <div
            type="button"
            className="bg-white border-blue border-2 text-white rounded-md px-6 py-2 font-bold text-sm outline-none"
          >
            <Spinner message="" />
          </div>
        ) : (
          <button
            type="button"
            className="bg-blue text-white rounded-md px-6 py-2 font-bold text-sm outline-none"
            onClick={postComment}
          >
            Post Comment
          </button>
        )}
      </div>
      {3 > 0 && (
        <h2 className="text-center font-bold text-md mt-8 mb-4">
          More like this
        </h2>
      )}
      {getPostsLoading ? (
        <Spinner message="Loading more posts..." />
      ) : (
        
          posts.length > 0 ? (
            <MasonryLayout posts={posts} refresh={() => {}} />
          ) : (
            <p
            className="font-bold text-sm self-end text-center"
          >
            No Posts
          </p>
          )
        
      )}
    </>
  );
};

export default PinDetail;
