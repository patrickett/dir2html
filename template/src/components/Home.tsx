import Navbar from "./nav";
import Footer from "./Footer";
import BreadCrumb from "./BreadCrumb";
import Table from "./Table";
import RightSideBar from "./RightSideBar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DirectoryEntry } from "../../types/filelist";

interface HomeProps {
  filelist: DirectoryEntry | null;
}

export default function Home({ filelist }: HomeProps) {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const pathString = params.get("path") ?? "";
  const pathParts = pathString.split("/").filter(Boolean);

  // This is used to make sure the page is updated on url change
  useEffect(() => {}, [location]);

  let tableItems = filelist;

  pathParts.forEach((part) => {
    const table = tableItems?.children?.find((e) => e.name === part && !e.file);
    if (table) tableItems = table;
    // else tableItems.children = null;
  });

  return (
    <div className="bg-white">
      <Navbar />
      <div className="px-6 mt-4 overflow-x-hidden lg:px-10">
        <div className="flex flex-col md:flex-row md:justify-between">
          <BreadCrumb pathParts={pathParts} />
        </div>

        <div className="flex items-center justify-between px-10 mt-6 -mx-10 border-b select-none md:mt-4">
          {/* <div className="flex">
            <div className="flex items-center px-4 pb-2 text-sm border-b-2 border-orange-400 cursor-pointer">
              <svg
                className="hidden w-5 h-5 mr-1 text-gray-700 md:block"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Code
            </div>
            <div className="flex items-center px-4 pb-2 text-sm border-b-2 border-transparent cursor-pointer hover:border-gray-300">
              <svg
                className="hidden w-5 h-5 mr-1 text-gray-700 md:block"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Issues
              <span className="flex items-center justify-center w-6 h-6 p-1 ml-1 text-xs bg-gray-200 rounded-full">
                129
              </span>
            </div>
            <div className="flex items-center px-4 pb-2 text-sm border-b-2 border-transparent cursor-pointer hover:border-gray-300">
              <svg
                className="hidden w-5 h-5 mr-1 text-gray-600 fill-current md:block"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                ></path>
              </svg>
              Pull requests
              <span className="flex items-center justify-center w-6 h-6 p-1 ml-1 text-xs bg-gray-200 rounded-full">
                38
              </span>
            </div>
            <div className="flex items-center hidden px-4 pb-2 text-sm border-b-2 border-transparent cursor-pointer hover:border-gray-300 md:flex md:block">
              <svg
                className="hidden w-5 h-5 mr-1 text-gray-700 md:block"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
              </svg>
              Discussions
            </div>
            <div className="flex items-center hidden px-4 pb-2 text-sm border-b-2 border-transparent cursor-pointer hover:border-gray-300 md:block md:flex">
              <svg
                className="hidden w-5 h-5 mr-1 text-gray-700 md:block"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Actions
            </div>
            <div className="flex items-center hidden px-4 pb-2 text-sm border-b-2 border-transparent cursor-pointer hover:border-gray-300 lg:flex lg:block">
              <svg
                className="hidden w-5 h-5 mr-1 text-gray-700 md:block"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"></path>
              </svg>
              Security
            </div>
            <div className="flex items-center hidden px-4 pb-2 text-sm border-b-2 border-transparent cursor-pointer hover:border-gray-300 lg:flex lg:block">
              <svg
                className="hidden w-5 h-5 mr-1 text-gray-700 md:block"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Insights
            </div>
          </div> */}
          <div className="flex items-start pb-2 cursor-pointer md:hidden">
            <svg
              className="w-5 h-5 text-gray-700 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </div>
        </div>

        <div className="container pb-10 mx-auto mt-8">
          <div className="md:flex">
            <div className="w-full mr-4 md:w-3/4">
              <div>
                <div className="flex justify-between px-4 py-3 bg-indigo-100 border border-indigo-200 rounded-t-lg">
                  <span className="ml-2 text-sm text-gray-600 w-2/3">Name</span>
                  <span className="ml-2 text-sm text-gray-600 w-1/6">
                    Created
                  </span>
                  <span className="ml-2 text-sm text-right text-gray-600 w-1/4">
                    Size
                  </span>
                </div>
                <Table pathParts={pathParts} tableItems={tableItems} />
                {/* <div className="py-2 text-center border-b border-l border-r rounded-b-lg md:hidden">
                  <p className="text-blue-600 cursor-pointer hover:underline">
                    View code
                  </p>
                </div> */}
              </div>
            </div>
            <RightSideBar filelist={filelist} tableItems={tableItems} />
          </div>
          <Footer />
          <div className="mt-12 border-t md:hidden border-gray-200 pt-8 mx-auto">
            <p className="text-base leading-6 text-gray-600 xl:text-center">
              © 2021 Patrickett
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
