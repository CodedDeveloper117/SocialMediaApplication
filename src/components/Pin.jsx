import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import {
  IoDownload,
  IoDownloadOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoChevronForwardCircle,
  IoTrashOutline
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const images = [
  "https://cdn.pixabay.com/photo/2022/01/18/16/49/town-6947538__340.jpg",
  "https://cdn.pixabay.com/photo/2018/11/10/22/57/mountain-3807667__340.jpg",
  "https://cdn.pixabay.com/photo/2022/01/10/15/29/wind-mills-6928590__340.jpg",
  "https://cdn.pixabay.com/photo/2021/12/15/20/21/sea-6873335__340.jpg",
  "https://cdn.pixabay.com/photo/2022/01/17/09/28/spider-webs-6944213__340.jpg",
  "https://cdn.pixabay.com/photo/2021/12/16/15/26/forest-6874717__340.jpg",
  "https://cdn.pixabay.com/photo/2022/01/16/13/25/cityscape-6942013__340.jpg",
  "https://cdn.pixabay.com/photo/2021/12/28/11/36/castle-6899041__340.jpg",
  "https://cdn.pixabay.com/photo/2022/01/18/23/31/farm-6948514__340.jpg",
  "https://cdn.pixabay.com/photo/2022/01/16/10/51/leaves-6941709__340.jpg",
];

const Pin = ({ post, lastItem }) => {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const [savingPost, setSavingPost] = useState(false);
  const [destinationHovered, setDestinationHovered] = useState(false)

  /* const alreadySaved = !!(save?.filter((item) => item.postedBy._id == user._id))
    .length; */

  const savePin = (id) => {
    /* if (!alreadySaved) {
      setSavingPost(true);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidV4(),
            userId: user.googleId,
            postedBy: { _type: "postedBy", _ref: user.googleId },
          },
        ])
        .commit()
        .then((data) => window.location.reload());
    } */
  };

  return (
    <div className={`${lastItem ? "" : "mr-1"} mt-1 cursor-pointer`}>
      <div
        onMouseEnter={() => {
          setPostHovered(true);
        }}
        onMouseLeave={() => {
          setPostHovered(false);
        }}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full object-cover"
          alt="image"
          src={post.image.image.asset.url}
        />
        {postHovered && (
          <div
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex justify-center items-center">
                <a
                  href={`$"{image?.asset?.url"}?id=`}
                  className="bg-white hover:opacity-100 hover:shadow-md outline-none rounded-full text-dark text-md w-6 h-6 items-center flex justify-center opacity-75"
                  download
                  onClick={(e) => e.stopPropagation()}
                >
                  <IoDownloadOutline />
                </a>
              </div>
              {true ? (
                <a
                  href={`$"{image?.asset?.url"}?id=`}
                  className="bg-white hover:opacity-100 hover:shadow-md outline-none rounded-full text-dark text-md w-6 h-6 items-center flex justify-center opacity-75"
                  download
                  onClick={(e) => e.stopPropagation()}
                >
                  <IoBookmarkOutline />
                </a>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin();
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-2 py-0.5 text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  <IoBookmark />
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              <a
                href="destination"
                target="black"
                rel="noreferrer"
                onMouseEnter={() => {
                  setDestinationHovered(true)
                }}
                onMouseLeave={() => {
                  setDestinationHovered(false)
                }}
                className="bg-white flex items-center py-1 text-black font-bold px-1 rounded-full opacity-70 hover:opacity-100 hover:shadow-md "
              >
                <IoChevronForwardCircle fontSize={16} />
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxLines: 1,
                    whiteSpace: 'nowrap',
                    fontSize: '0.55rem',
                    width: destinationHovered ? '110px' : "0px",
                    transition: 'all 500ms ease-in-out'
                  }}
                >
                  {post.destination}
                </div>
              </a>
              <a
                  href={`$"{image?.asset?.url"}?id=`}
                  className="bg-white hover:opacity-100 hover:shadow-md outline-none rounded-full text-dark text-md w-6 h-6 items-center flex justify-center opacity-75"
                  download
                  onClick={(e) => e.stopPropagation()}
                >
                  <IoTrashOutline />
                </a>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-start gap-1 mt-1 ">
        <img
          src={post.author.image}
          alt="image"
          className="object-cover w-30 h-30 rounded-full"
        />
        <p className="text-dark font-semibold text-sm">
          {post.author.username}
        </p>
      </div>
    </div>
  );
};

export default Pin;
