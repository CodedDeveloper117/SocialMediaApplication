import React, { useEffect, useState } from "react";
import { AiOutlineLogout, AiOutlineEdit } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { client } from "../utils/client";
import { userQuery } from "../utils/data";

//import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
//import { client } from '../client';
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import EditContainer from "./EditContainer";

const activeBtnStyles =
  "bg-red-500 text-white text-xs font-bold p-2 rounded-full outline-none transition-all duration-500ms";
const notActiveBtnStyles =
  "bg-primary text-xs text-black font-bold p-2 rounded-full outline-none";
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
  const [inProp, setInProp] = useState(false)
  const [showModal, setShowModal] = useState(false)

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
    /* if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    } */
  }, [text, userId]);
  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };

  if (loading && !user) {
    console.log("user")
    return (
      <div className="w-full h-full justify-center items-center">
        <Spinner message="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      {inProp && (
        <EditContainer inProp={inProp} setInProp={setInProp} />
      )}
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-60 h-60 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-sm text-center mt-3 flex items-center justify-center gap-1">
            {user.username}
            <button
              type="button"
              className="bg-white p-1 rounded-full cursor-pointer outline-none"
              onClick={() => {
                setInProp(true)
              }}
            >
              <IoCreateOutline fontSize={16} />
            </button>
          </h1>
          <div className="text-xs flex items-center gap-2 ml-2">
            Your Bio
            <button
              type="button"
              className="bg-white p-1 rounded-full cursor-pointer outline-none"
              onClick={() => {
                setInProp(true)
              }}
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

        <div className="px-2">
          <MasonryLayout />
        </div>

        {1 === 0 && (
          <div className="flex justify-center font-bold items-center w-full mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};
export default UserProfile;
