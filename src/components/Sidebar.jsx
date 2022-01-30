import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/logo.png";
import { categories } from "../utils/categories";
import Hamburger from "./Hamburger";
import { MdClose } from "react-icons/md";
const isNotActiveStyle =
  "flex items-center gap-2 text-gray-500 text-xs hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center gap-2 font-extrabold text-xs text-active border-l-2 border-blue transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, setActive, active, mdAndBelow = false }) => {
  return (
    <div
      className="transition-all duration-200 ease-in flex flex-col justify-between bg-white h-full overflow-y-scroll custom-scrollbar overflow-x-hidden"
      style={{
        width: mdAndBelow ? "250px" : ( active ? "250px" : "65px"),
      }}
    >
      <div className="flex flex-col w-full">
        {!mdAndBelow ? (
          <div className="w-40 h-40 mt-2 ml-2 cursor-pointer" onClick={() => setActive(!active)}>
            <Hamburger setActive={setActive} active={active} />
          </div>
        ) : (
          <div
            className="w-40 h-40 mt-2 ml-2 rounded-full border-2 border-blue flex justify-center items-center cursor-pointer"
            onClick={() => {
              console.log(active)
              setActive(false)
            }}
          >
            <MdClose fontSize={20} />
          </div>
        )}
        {/* <Link
          to="/"
          className="flex px-5 gap-2 mt-2 my-5 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-28" />
        </Link> */}
        <div className="flex w-full flex-col gap-2 w-full justify-start">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-15 mt-2 w-full relative overflow-hidden ${
                isActive ? isActiveStyle : isNotActiveStyle
              }`
            }
          >
            <IoHomeOutline className="flex self-center" fontSize={30} />
            <p className="absolute left-[60px] text-sm font-bold">Home</p>
          </NavLink>
          {/* <h3 className="text-sm">Discover Categories</h3> */}
          {categories.map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                `px-15 w-full relative overflow-hidden ${
                  isActive ? isActiveStyle : isNotActiveStyle
                }`
              }
              key={category.name}
            >
              <img
                className="rounded-full w-30 h-30 object-cover"
                src={category.image}
                alt="user-pic"
              />
              <p className="absolute left-[60px] text-sm font-bold">
                {category.name}
              </p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
