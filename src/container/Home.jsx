import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, Route, Routes } from "react-router-dom";
import { NavBar, PinDetail, CreatePin, Search, Feed } from "../components";
import { Sidebar, UserProfile } from "../components";
import { client } from "./client";
import logo from "../assets/logo.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      console.log(data);
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>

      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={25}
            className="cursor-pointer inline-block"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28 inline-block" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img className="w-7 rounded-full inline-block" src={user?.image} />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-3/5 h-screen overflow-y-auto bg-white shadow-md z-10 animate-slide-in">
            <div className="absolute flex justify-end items-center p-2 top-0 right-0">
              <IoClose
                fontSize={25}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/" element={<Pins user={user && user} />}>
            <Route path="/" element={<Feed />} />
            <Route path="category/:categoryId" element={<Feed />} />
            <Route path="pin-detail/:pinId" element={<PinDetail />} />
            <Route path="create-pin" element={<CreatePin />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
