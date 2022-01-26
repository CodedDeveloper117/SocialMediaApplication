import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/logo.png";

const categories = [
  { catogory: "Animals" },
  { catogory: "Wallpapers" },
  { catogory: "Photography" },
  { catogory: "Gaming" },
  { catogory: "Coding" },
];
const isNotActiveStyle =
  "flex item-center px-5 gap-3 text-gray-500 text-xs hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex item-center px-5 gap-3 font-extrabold text-xs border-r-2 transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 mt-2 my-5 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-28" />
        </Link>
        <div className="flex flex-col gap-5 item-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <IoHomeOutline className="flex self-center" />
            Home
          </NavLink>
          <h3 className="px-5 text-sm">Discover Categories</h3>
          {categories.map((data) => (
            <NavLink
              to={`/category/${data.catogory}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              key={data.catogory}
            >
              {data.catogory}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
