import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { IoCloseOutline } from "react-icons/io5";

const defaultStyles = {
  width: "100%",
  height: "100%",
  zIndex: "100",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  position: "fixed",
  justifyContent: "center",
  top: 0,
  left: 0,
  transition: "all 90ms ease-in",
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0.5 },
  entered: { opacity: 1 },
  exiting: { opacity: 0.5 },
  exited: { opacity: 0 },
};

const EditContainer = ({ inProp, setInProp }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 200);
  }, []);
  const onExit = () => {};
  return (
    <Transition in={showModal} timeout={90}>
      {(state) => (
        <div
          style={{
            ...defaultStyles,
            ...transitionStyles[state],
          }}
        >
          <div
            className="px-2 my-2 w-340 rounded-md flex flex-col shadow-md bg-white transition-all duration-500 ease-in-out"
            style={{
              height: "fit-content",
              transform: showModal ? 'translateY(0rem)' : 'translateY(-8rem)',
              
            }}
          >
            <div className="flex justify-between items-center my-2">
              <h3 className="text-sm font-extrabold">Edit your bio</h3>
              <div
                className="rounded-full p-2 shadow-md cursor-pointer"
                onClick={() => {
                  setShowModal(false);
                  setTimeout(() => {
                    setInProp(false);
                  }, 200);
                }}
              >
                <IoCloseOutline fontSize={16} />
              </div>
            </div>
            <textarea
              type="text"
              className="outline-none border rounded-sm px-2 py-1 w-full bg-gray-50"
              style={{ fontSize: "0.7rem" }}
              placeholder="Add your destination link... or leave blank"
              value={""}
              onChange={(e) => {}}
              rows={5}
            />
            <button
              className="outline-none border-none text-white my-2 self-end bg-blue rounded-md shadow-md font-extrabold text-sm py-1 px-2"
              type="button"
              style={{ width: "fit-content" }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default EditContainer;
