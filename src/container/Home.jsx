import React, { useState, useEffect, useRef } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { PinDetail, CreatePin, Search, Feed } from "../components";
import { Sidebar, UserProfile } from "../components";
import Logo from '../assets/Logo'
import Pins from "./Pins";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import Spinner from "../components/Spinner";
import Hamburger from "../components/Hamburger";
import NotFound from "../components/NotFound";

const Home = ({ setLoggedOut }) => {
  const [active, setActive] = useState(false);
  const user = useSelector((state) => state.user);
  const [userExists, setUserExists] = useState(true);
  const scrollRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    const userID = localStorage.getItem("userID", null);
    if (userID) {
      dispatch(getUser(userID));
    } else {
      setUserExists(false);
    }
  }, []);
  //console.log(user)
  useEffect(() => {
    if (user.error) {
      setUserExists(false);
    }
  }, [user]);

  if (!user.data && userExists)
    return (
      <div
        className="w-full h-screen flex items-center justify-center"
        style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
      >
        <Spinner message="Please wait while we get user information..." />
      </div>
    );

  if (!userExists) return <Navigate to="/login" />;

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar
          user={user && user}
          active={active}
          setActive={setActive}
        />
      </div>

      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <Hamburger
            setActive={setActive}
            active={active}
          />
          <Link to="/">
            <Logo />
          </Link>
          <Link to={`user-profile/${user?.data._id}`}>
            <img className="w-40 rounded-full inline-block" alt="user-image" src={user.data.image} />
          </Link>
        </div>
        <div
            className="fixed top-0 left-0 h-screen overflow-y-auto bg-white shadow-md z-10 transition-all duration-500 ease-in-out"
            style={{
              transform: active
                ? "translateX(0px)"
                : "translateX(-250px)",
            }}
          >
            <Sidebar
              user={user && user}
              active={active}
              setActive={setActive}
              mdAndBelow
            />
          </div>
      </div>
      <div
        className="pb-2 flex-1 h-screen overflow-y-scroll custom-scrollbar2"
        ref={scrollRef}
      >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile setLoggedOut={setLoggedOut} />} />
          <Route path="/" element={<Pins user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}>
            <Route path="/" element={<Feed />} />
            <Route path="category/:categoryId" element={<Feed />} />
            <Route path="pin-detail/:pinId" element={<PinDetail />} />
            <Route path="create-pin" element={<CreatePin />} />
            <Route path="search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
