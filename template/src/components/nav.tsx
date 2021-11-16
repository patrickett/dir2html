import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useEffect, useRef, useState } from "react";
import SearchModal from "./SearchModal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    // position: "fixed",
    display: "flex",
    justifyContent: "center",
    padding: "none",
    border: "none",
    // inset: "auto",
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    width: "33%",
    border: "none",
    inset: "unset",
    padding: "none",
    // top: "50%",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
  },
};

function useKey(key: string, cb: Function, normal = false) {
  const callbackRef = useRef(cb);
  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (event.code === key) {
        if (!normal) event.preventDefault();
        callbackRef.current(event);
      }
    }

    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key, normal]);
}

export default function Navbar() {
  const [showing, setShown] = useState(false);
  const openModal = () => {
    setShown(true);
  };
  const closeModal = () => {
    setShown(false);
  };

  useKey("Slash", openModal, showing);

  return (
    <nav className="bg-gray-800">
      <div className=" mx-auto  sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="">
            <div className="justify-center text-center">
              <Link to="/">
                <h2 className="font-semibold text-white">dir2html</h2>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center">
              <button
                onClick={openModal}
                className="px-24 py-1 text-sm text-white border-2 border-transparent hover:border-gray-600 placeholder-white bg-gray-700 rounded-lg focus:outline-none focus:shadow-none lg:block"
              >
                Search or jump to...
              </button>

              <Modal
                isOpen={showing}
                ariaHideApp={false}
                style={customStyles}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Search"
              >
                <SearchModal closeModal={closeModal} />
              </Modal>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center">
              <button
                className="p-1 text-gray-400 border-2 border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                aria-label="Help"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-6 h-6"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex -mr-2 md:hidden">
            <button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
              <svg
                className="block w-6 h-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
