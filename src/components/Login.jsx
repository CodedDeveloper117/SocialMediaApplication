import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { useDispatch } from 'react-redux'
import { createUser } from "../redux/slices/userSlice";
import { useSelector } from 'react-redux'
import Spinner from "./Spinner";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector(state => state.user);
  const [firstLaunch, setFirstLaunch] = useState(false)
  useEffect(() => {
    if(state.data !== null && firstLaunch) {
      navigate("/")
    } else {

    }
  }, [state])
  const successResponse = (response) => {
    setFirstLaunch(true)
    dispatch(createUser(response.profileObj))
  }

  const failureResponse = (response) => {
    console.log(response);
    
  }

  return (
    <div className="flex relative justify-start items-center flex-col h-screen">
      {/* <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full">
        <Spinner />
      </div> */}
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute flex justify-center items-center top-0 bottom-0 right-0 flex-col bg-blackOverlay left-0">
        <div className="p-5">
          <img src={logo} width="130px" alt="logo" />
        </div>
        <div className="shadow-2xl">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                type="button"
                className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              >
                <FcGoogle className="mr-4" />
                Sign in with Google
              </button>
            )}
            onSuccess={successResponse}
            onFailure={failureResponse}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
