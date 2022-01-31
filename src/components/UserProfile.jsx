import React, { useEffect, useState } from "react";
import { AiOutlineLogout, AiOutlineEdit } from "react-icons/ai";
import { IoCameraOutline, IoCreateOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { client } from "../utils/client";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";

//import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
//import { client } from '../client';
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import EditContainer from "./EditContainer";
import { MAX_FILE_SIZE } from "../utils/constants";

const activeBtnStyles =
  "text-blue text-xs font-bold p-2 border-b-2 border-blue outline-none transition-all duration-500ms";
const notActiveBtnStyles = "text-xs text-black font-bold p-2 outline-none";
const image =
  "https://cdn.pixabay.com/photo/2022/01/18/16/49/town-6947538__340.jpg";
const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [inProp, setInProp] = useState(false);
  const [edit, setEdit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [messageProps, setMessageProps] = useState({
    message: "",
    show: false,
  });
  const [pinsLoading, setPinsLoading] = useState(false);

  const getPosts = () => {};

  useEffect(() => {
    setLoading(true);
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
      setLoading(false);
    });
    //console.log(user, "Hello");
  }, []);

  useEffect(() => {
    if (text === "Created") {
      setPinsLoading(true);
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
        setPinsLoading(false);
      });
    } else {
      setPinsLoading(true);
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
        setPinsLoading(false);
      });
    }
  }, [text, userId]);
  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };

  const updateField = (type) => {
    setEdit({
      type,
      update: async (field) => {
        console.log(field, type, user._id);
        setLoading(true);
        client
          .patch(user._id)
          .set({ [type]: field })
          .commit()
          .then((data) => {
            setUser(data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
    setInProp(true);
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/svg" ||
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/tiff")
    ) {
      if (file.size > MAX_FILE_SIZE) {
        setMessageProps({
          show: true,
          message: "File is to big, it should not be more than 5MB",
        });
        setTimeout(() => {
          setMessageProps({
            show: false,
            message: "File is to big, it should not be more than 5MB",
          });
        }, 3000);
      } else {
      }
    } else {
      setMessageProps({ show: true, message: "Wrong Image Type" });
      setTimeout(() => {
        setMessageProps({ show: false, message: messageProps.message });
      }, 3000);
    }
  };

  if (loading && !user) {
    console.log("user");
    return (
      <div className="w-full h-full justify-center items-center z-100">
        <Spinner message="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      {inProp && (
        <EditContainer edit={edit} inProp={inProp} setInProp={setInProp} />
      )}
      {loading && (
        <div
          className="w-full h-full justify-center items-center fixed top-0 text-white left-0 w-full h-full"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: "100" }}
        >
          <Spinner message="Updating profile..." />
        </div>
      )}
      <div
        className={`fixed top-2 left-2 bg-red-500 p-2 rounded-md transition-all duration-500 ease-in-out`}
        style={{
          transform: messageProps.show
            ? "translateY(0rem)"
            : "translateY(-3rem)",
          zIndex: "999",
        }}
      >
        <p className="text-center font-bold text-xs px-2 text-white">
          {messageProps.message}
        </p>
      </div>
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <div
              className="w-60 h-60 -mt-10 shadow-xl rounded-full relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setShowCamera(true)}
              onMouseLeave={() => setShowCamera(false)}
              onClick={() => {}}
            >
              <img
                className="rounded-full w-60 h-60 object-cover"
                src={user.image}
                alt="user-pic"
              />
              <label
                className={`${
                  showCamera ? "opacity-100" : "opacity-0"
                } transition-all duration-200 ease-in-out rounded-full w-60 h-60 absolute top-0 left-0 flex flex-col items-center justify-center bg-zinc-900/25`}
                htmlFor="upload"
              >
                <IoCreateOutline fontSize={25} color="white" />
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
            </div>
          </div>
          <h1 className="font-bold text-sm text-center mt-3 flex items-center justify-center gap-1">
            {user.username}
            <button
              type="button"
              className="bg-white p-1 rounded-full cursor-pointer outline-none"
              onClick={() => updateField("username")}
            >
              <IoCreateOutline fontSize={16} />
            </button>
          </h1>
          <div className="text-xs flex items-center gap-2 ml-2">
            Your Bio
            <button
              type="button"
              className="bg-white p-1 rounded-full cursor-pointer outline-none"
              onClick={() => updateField("bio")}
            >
              <IoCreateOutline fontSize={16} />
            </button>
          </div>
          <div className="text-xs text-center mt-1 border border-gray-500 rounded-md p-2 mx-2">
            {user.bio}
          </div>
          <div className="absolute top-0 z-1 right-0 p-2">
            {true && (
              <GoogleLogout
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                render={(renderProps) => (
                  <button
                    type="button"
                    className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <AiOutlineLogout color="red" fontSize={20} />
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        {pinsLoading && (
          <div className="h-screen w-full flex items-center justify-center">
            <Spinner message="Please wait as we get your posts..." />
          </div>
        )}

        {pins?.length > 0 && (
          <div className="px-2">
            <MasonryLayout posts={pins} refresh={() => {}} />
          </div>
        )}

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};
export default UserProfile;
