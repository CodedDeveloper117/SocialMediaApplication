import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoTrash } from "react-icons/io5";
import { categories } from "../utils/categories";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/slices/postSlice";
import { getUser } from "../redux/slices/userSlice";

const image =
  "https://cdn.pixabay.com/photo/2022/01/18/16/49/town-6947538__340.jpg";

const showMessageClass = "translate-y-0";
const hideMessageClass = "-translate-y-10";

const CreatePin = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const posts = useSelector((state) => state.posts);
  const [showMessage, setShowMessage] = useState(hideMessageClass);

  useEffect(() => {
    if (posts.loading === false && posts.data) {
      setShowMessage(showMessageClass);
      setTimeout(() => {
        setShowMessage(hideMessageClass);
      }, 3000);
    }
  }, [posts.loading]);

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImageType(false);
      const url = URL.createObjectURL(selectedFile);
      setImageAsset({
        file: selectedFile,
        url,
      });
    } else {
      setWrongImageType(true);
      setImageAsset(null);
    }
  };

  const savePin = () => {
    if (title && about && imageAsset !== null && category) {
      dispatch(
        createPost({
          imageAsset,
          category,
          title,
          about,
          destination,
          userID: user._id,
        })
      );
    } else {
      setFields(true);
      console.log(title, about, imageAsset, category);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="w-full flex flex-col p-2 bg-white mt-2 rounded-md relative overflow-hidden">
      {posts.loading && (
        <div
          className="absolute top-0 left-0 w-full h-full z-50"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        >
          <Spinner message="Please wait while we upload your post..." />
        </div>
      )}
      <div
        className={`absolute top-2 left-2 z-50 bg-blue-900 p-2 rounded-full transition-all duration-500 ease-in-out ${showMessage}`}
      >
        <p className="text-center font-bold text-xs px-2 text-white">
          Uploaded Successfully
        </p>
      </div>
      <p
        className="bg-red-500 text-white p-1 rounded-md absolute top-1 left-1 mb-5 text-xs transition-all duration-500 ease-in z-10"
        style={{ transform: fields ? "translateY(0rem)" : "translateY(-2.5rem)" }}
      >
        Please add all fields.
      </p>
      <div className="flex w-full flex-row">
        <div className="w-full h-full bg-secondaryColor flex-1 p-2 relative rounded-md">
          {wrongImageType && (
            <p className="absolute top-5 left-5 text-xs text-red-500">
              It&apos;s wrong file type.
            </p>
          )}
          <div
            className="flex items-center justify-center flex-col border-2 rounder-md border-dotted p-2 w-full"
            style={{ height: "250px" }}
          >
            {!imageAsset ? (
              <label className="cursor-pointer w-full h-full" htmlFor="upload">
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
                  id="upload"
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full w-full">
                <img
                  src={imageAsset.url}
                  alt="uploaded-pic"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-white cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <IoTrash fontSize={16} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col gap-2 px-2">
          <input
            type="text"
            className="outline-none border-none rounded-sm px-2 py-1 w-full bg-gray-50"
            style={{ fontSize: "0.7rem" }}
            placeholder="Please enter your title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center justify-start gap-2">
            <img
              src={user.image}
              alt="image"
              className="object-cover w-6 h-6 rounded-full"
            />
            <p
              className="text-dark font-semibold"
              style={{ fontSize: "0.6rem" }}
            >
              {user.username}
            </p>
          </div>
          <textarea
            type="text"
            className="outline-none border-none rounded-sm px-2 py-1 w-full bg-gray-50"
            style={{ fontSize: "0.7rem" }}
            placeholder="What's your pin about..."
            value={about}
            rows={3}
            onChange={(e) => setAbout(e.target.value)}
          />
          <input
            type="text"
            className="outline-none border-none rounded-sm px-2 py-1 w-full bg-gray-50"
            style={{ fontSize: "0.7rem" }}
            placeholder="Add your destination link... or leave blank"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-xs">Choose Pin Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-full border-b-1 border-gray-200 text-xs p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="bg-white text-xs">
                  Select Category
                </option>
                {categories.map((item) => (
                  <option
                    className="border-0 text-xs outline-none capitalize bg-white text-black "
                    value={item.name}
                    key={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={() => savePin()}
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
