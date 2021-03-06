import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import {
  IoDownloadOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoChevronForwardCircle,
  IoTrashOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { client, urlFor } from "../utils/client";
import Spinner from "../components/Spinner";

const Pin = ({ post, lastItem, refresh, itemRef }) => {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const [savingPost, setSavingPost] = useState(false);
  const [destinationHovered, setDestinationHovered] = useState(false);
  const { _id, image, destination } = post;
  const url = image.image.asset.url;
  const user = useSelector((state) => state.user.data);
  let alreadySaved = post.save?.filter((item) => item?.userId === user._id);
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];
  const isAuthor = post.author?._id === user._id;
  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidV4(),
            userId: user._id,
            author: {
              _type: "author",
              _ref: post.author._id,
            },
          },
        ])
        .commit()
        .then((data) => {
          setSavingPost(false);
          refresh();
        });
    }
  };

  const unsavePin = (id) => {
    const query = [`save[userId == "${user._id}"]`]
    if (alreadySaved?.length > 0) {
      setSavingPost(true);
      client
        .patch(id)
        .unset(query)
        .commit()
        .then((data) => {
          console.log(data)
          setSavingPost(false);
          refresh();
        });
    }
  };

  const deletePin = (id) => {
    setSavingPost(true);
    client.delete(id).then(() => {
      setSavingPost(false);
      refresh();
    });
  };

  return (
    <div
      id={post._id}
      className={`${lastItem ? "" : "mr-1"} mt-1 cursor-pointer`}
      ref={itemRef}
    >
      <div
        onMouseEnter={() => {
          setPostHovered(true);
        }}
        onMouseLeave={() => {
          setPostHovered(false);
        }}
        className="relative w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onClick={() => navigate(`/pin-detail/${_id}`)}
      >
        <img
          className="rounded-lg w-full object-cover cursor-pointer"
          alt="image"
          src={urlFor(url).width(250).url()}
        />
        {savingPost && (
          <div
            className="text-white absolute top-0 left-0 w-full h-full flex items-center justify-center z-50"
            style={{ height: "100%", backgroundColor: 'rgba(255,255,255,0.6)' }}
          >
            <Spinner message="" />
          </div>
        )}

        {postHovered && !savingPost && (
          <div
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex justify-center items-center">
                <a
                  href={`${url}?dl=`}
                  className="bg-white hover:opacity-100 hover:shadow-md outline-none rounded-full text-dark text-md w-6 h-6 items-center flex justify-center opacity-75"
                  download
                  onClick={(e) => e.stopPropagation()}
                >
                  <IoDownloadOutline />
                </a>
              </div>
              {alreadySaved?.length === 0 ? (
                <button
                  className="bg-white hover:opacity-100 hover:shadow-md outline-none rounded-full text-dark text-md w-6 h-6 items-center flex justify-center opacity-75 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  <IoBookmarkOutline />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    unsavePin(_id);
                  }}
                  type="button"
                  className="bg-blue hover:opacity-100 hover:shadow-md outline-none rounded-full text-dark text-md w-6 h-6 items-center flex justify-center opacity-75 z-10"
                >
                  <IoBookmark color={"white"} />
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              <a
                href={`${destination}`}
                target="black"
                rel="noreferrer"
                onMouseEnter={() => {
                  setDestinationHovered(true);
                }}
                onMouseLeave={() => {
                  setDestinationHovered(false);
                }}
                className="bg-white flex items-center py-1 text-black font-bold px-1 rounded-full opacity-70 hover:opacity-100 hover:shadow-md "
              >
                <IoChevronForwardCircle fontSize={16} />
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxLines: 1,
                    whiteSpace: "nowrap",
                    fontSize: "0.55rem",
                    maxWidth: destinationHovered ? "110px" : "0px",
                    transition: "all 500ms ease-in-out",
                    padding: destinationHovered ? "0px 5px" : "0px",
                  }}
                >
                  {post.destination}
                </div>
              </a>
              {isAuthor && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  type="button"
                  className="bg-blue hover:opacity-100 hover:shadow-md outline-none rounded-full text-dark text-md w-6 h-6 items-center flex justify-center opacity-75 z-10"
                >
                  <IoTrashOutline color="white" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${post.author._id}`}
        className="flex items-center justify-start gap-1 mt-1 z-10"
      >
        <img
          src={post.author.image.includes('sanity') ? urlFor(post.author.image).url(): post.author.image}
          alt="image"
          className="object-cover w-30 h-30 rounded-full"
        />
        <p className="text-dark font-semibold text-xs">
          {post.author.username}
        </p>
      </Link>
    </div>
  );
};

export default Pin;
