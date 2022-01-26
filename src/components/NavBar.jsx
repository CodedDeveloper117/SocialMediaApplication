import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch, IoAdd } from "react-icons/io5";
import { useSelector } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  console.log(user.data.image)
  if(!user) return null

  return (
    <div className="flex gap-2 md:gap-5 mt-3 pd-7">
      <div className="flex justify-start items-center flex-1 px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoSearch fontSize={20} className="ml-1" />
        <input
          type="text"
          onChange={(e) => {}}
          className="p-2 w-full bg-white outline-none text-xs"
          placeholder="Search"
          onFocus={() => navigate("/search")}
          value=""
        />
      </div>
      <div className="flex gap-3 items-center">
        <Link to={`/user-profile/${user._id}`} className="hidden md:block">
          <img className="w-9 h-9 rounded-full inline-block" src={user.data.image} />
        </Link>
        <Link
          to="create-pin"
          className="bg-white text-gray-800 rounded-full w-9 h-9 md:w-9 md:h-9 flex items-center justify-center"
        >
          <IoAdd />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
