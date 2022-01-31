import React from "react";
import { IoShareSocialOutline } from "react-icons/io5";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <div className="w-40 h-40 justify-center items-center flex border-2 border-blue rounded-full">
        <IoShareSocialOutline fontSize={25} color="#03a9f4" />
      </div>
        <p className="font-bold text-blue">Let's Share</p>
    </div>
  );
};

export default Logo;
