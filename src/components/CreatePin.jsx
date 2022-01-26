import React from "react";
import Spinner from "./Spinner";
import { AiOutlineCloudUpload } from "react-icons/ai";

const image =
  "https://cdn.pixabay.com/photo/2022/01/18/16/49/town-6947538__340.jpg";
const categories = [
  { catogory: "Animals" },
  { catogory: "Wallpapers" },
  { catogory: "Photography" },
  { catogory: "Gaming" },
  { catogory: "Coding" },
];

const CreatePin = () => {
  return (
    <div className="w-full flex flex-col p-2 bg-white mt-2 rounded-md">
      <div className="flex w-full flex-row">
        <div className="bg-secondaryColor flex-1 p-2 relative rounded-md">
          <div className="absolute top-0 left-0 w-full h-full">
            <Spinner />
          </div>
          <div
            className="flex items-center justify-center flex-col border-2 rounder-md border-dotted p-2 w-full"
            style={{ height: "250px" }}
          >
            <label className="cursor-pointer w-full h-full">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-2xl">
                    <AiOutlineCloudUpload />
                  </p>
                  <p className="text-xs">Click to upload</p>
                </div>

                <p className="mt-32 text-gray-400 text-xs">
                  Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or
                  TIFF less than 20MB
                </p>
              </div>
              <input
                type="file"
                name="upload-image"
                onChange={() => {}}
                className="w-0 h-0"
              />
            </label>
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col gap-2 px-2">
          <input
            type="text"
            className="outline-none border-none rounded-sm px-2 py-1 w-full bg-gray-50"
            style={{ fontSize: "0.7rem" }}
            placeholder="Please enter your title here..."
          />
          <div className="flex items-center justify-start gap-2">
            <img
              src={image}
              alt="image"
              className="object-cover w-6 h-6 rounded-full"
            />
            <p
              className="text-dark font-semibold"
              style={{ fontSize: "0.6rem" }}
            >
              Emmanuel Stanley
            </p>
          </div>
          <input
            type="text"
            className="outline-none border-none rounded-sm px-2 py-1 w-full bg-gray-50"
            style={{ fontSize: "0.7rem" }}
            placeholder="What's your pin about..."
          />
          <input
            type="text"
            className="outline-none border-none rounded-sm px-2 py-1 w-full bg-gray-50"
            style={{ fontSize: "0.7rem" }}
            placeholder="Add your destination link..."
          />

          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-xs">Choose Pin Category</p>
              <select
                onChange={(e) => {}}
                className="outline-none w-full border-b-1 border-gray-200 text-xs p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="bg-white text-xs">
                  Select Category
                </option>
                {categories.map((item) => (
                  <option
                    className="border-0 text-xs outline-none capitalize bg-white text-black "
                    value={item.catogory}
                  >
                    {item.catogory}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={() => {}}
                className="bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
