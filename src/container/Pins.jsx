import React from "react";
import { Route, Outlet } from "react-router-dom";
import { NavBar } from "../components";

const Pins = ({ user }) => {
  return (
    <div className="flex-1 h-full px-2 md:px-5">
      <div className="bg-gray-50">
        <NavBar user={user} />
      </div>
      <Outlet />
    </div>
  );
};

export default Pins;
