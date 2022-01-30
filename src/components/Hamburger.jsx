import React, { useState } from "react";

const Hamburger = ({ setActive, active }) => {
  const onClick = () => {
    setActive(!active);
  };
  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center rounded-md shadow-md cursor-pointer"
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "#03a9f4",
      }}
    >
      <div
        className="absolute bg-white rounded-sm transition-all duration-300 ease-in-out"
        style={{
          width: "30px",
          height: "2px",
          right: "5px",
          left: "5px",
          transform: active
            ? "translateY(0) rotate(45deg)"
            : "translateY(-7px)",
          transitionDelay: "0.25s",
        }}
      ></div>
      <div
        className="absolute bg-white rounded-sm transition-all duration-300 ease-in-out"
        style={{
          width: active ? "0px" : "15px",
          height: "2px",
          left: "5px",
          transform: active ? "translateX(60px)" : "",
        }}
      ></div>
      <div
        className="absolute bg-white rounded-sm transition-all duration-300 ease-in-out"
        style={{
          height: "2px",
          left: "5px",
          transform: active
            ? "translateY(0) rotate(315deg)"
            : "translateY(7px)",
          transitionDelay: "0.25s",
          width: active ? "30px" : "25px",
        }}
      ></div>
    </div>
  );
};

export default Hamburger;
