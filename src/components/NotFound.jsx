import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="h-screen w-full flex items-center justify-center flex-col">
    <h1 className="font-bold text-lg m-2">404 - Not Found!</h1>
    <Link
      to="/"
      className="font-bold text-sm p-2 bg-blue outline-none shadow-md rounded-md text-white"
    >
      Go To Home
    </Link>
  </div>
);

export default NotFound;
