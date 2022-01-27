import React from "react";
import { Circles } from 'react-loader-spinner'

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Circles height={20} width={20} className="m-5" color="#00BFFF" />
      <p className="text-center font-bold text-sm px-2">{message}</p>
    </div>
  );
};

export default Spinner;
