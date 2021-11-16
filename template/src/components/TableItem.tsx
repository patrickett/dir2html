import { Link } from "react-router-dom";
import { DirectoryEntry } from "../../types/filelist";

export default function TableItem(
  json: DirectoryEntry,
  pathParts: string[],
  key: number,
  border = true
) {
  const limit = (string = "", limit = 0) => {
    return string.substring(0, limit);
  };

  let svg = (
    <svg
      className="w-6 h-6 text-blue-600"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
    </svg>
  );

  if (json.file) {
    svg = (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
      </svg>
    );
  }

  return (
    <div
      key={key}
      className={`flex px-4 py-2 text-sm hover:bg-gray-200 ${
        border ? "border-b" : ""
      }`}
    >
      <div className="flex w-2/3">
        {svg}

        {json.file ? (
          <div
            className="ml-2 cursor-pointer hover:underline hover:text-blue-500"
            title={json.name}
          >
            {limit(json.name, 45)}
          </div>
        ) : (
          <Link
            title={json.name}
            className="ml-2 cursor-pointer hover:underline hover:text-blue-500"
            to={`?path=${pathParts.join("/")}/${json.name}`}
          >
            {limit(json.name, 45)}
          </Link>
        )}
      </div>
      <p className="w-1/4 text-left">11/11/2021</p>
      <p className="w-1/6 text-right">183 KB</p>
    </div>
  );
}

// NEED TO MAKE URL CHANGE ONLY WITH PARAMS BECAUSE OTHERWISE ON FILESYSTEM IT ERRORS OUT
