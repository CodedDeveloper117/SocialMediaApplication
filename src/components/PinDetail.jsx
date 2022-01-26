import React from "react";
import { MdDownloadForOffline } from 'react-icons/md'
import { Link } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const image =
  "https://cdn.pixabay.com/photo/2022/01/18/16/49/town-6947538__340.jpg";

const PinDetail = () => {
  return (
    <>
      <div
        className="flex xl:flex-row flex-col m-auto bg-white"
        style={{ maxWidth: "1500px", borderRadius: "32px" }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            className="rounded-t-3xl rounded-b-lg"
            src={image}
            alt="user-post"
          />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
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
            <a href={''} target="_blank" rel="noreferrer">
              Destination
            </a>
          </div>
          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              title
            </h1>
            <p className="mt-3">About</p>
          </div>
          <Link
            to={`/user-profile/`}
            className="flex gap-2 mt-5 items-center bg-white rounded-lg "
          >
            <img
              src={image}
              className="w-10 h-10 rounded-full"
              alt="user-profile"
            />
            <p className="font-bold">username</p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto">
            {[0,1,2,3,4,5,6].map((item) => (
              <div
                className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                key={item}
              >
                <img
                  src={image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
                <div className="flex flex-col">
                  <p className="font-bold">username</p>
                  <p>{item} comments</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/`}>
              <img
                src={image}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="user-profile"
              />
            </Link>
            <input
              className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={""}
              onChange={(e) => {}}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={() => {}}
            >
              {false ? "Doing..." : "Done"}
            </button>
          </div>
        </div>
      </div>
      {3 > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {false ? (
        <MasonryLayout />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;
