import SearchResult from "./SearchResult";

interface SearchModalProps {
  closeModal: () => void;
}

export default function SearchModal({ closeModal }: SearchModalProps) {
  return (
    <div className="rounded-lg mt-1 bg-gray-50 border-y">
      <div className="flex flex-row justify-between py-3 px-6 bg-gray-50 border border-gray-300 rounded-t-lg  items-center">
        <div className="w-1/12 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>

        <input
          autoFocus
          autoComplete="off"
          type="text"
          name="query"
          placeholder="Search filelist"
          className="w-10/12 bg-gray-50 focus:outline-none text-sm font-light"
        />

        {/* if has text then add a clear text button */}

        <div className="w-1/12  flex justify-center">
          <button onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              />
              <path
                fill-rule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="border-r border-l border-gray-300">
        <div id="searchResult">
          {SearchResult()}
          {SearchResult()}
        </div>

        <div>
          <span className="text-xs font-light ml-4">Recent Searches</span>
          {SearchResult(true)}
          {SearchResult(true)}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between py-2 bg-gray-200 border border-top-0 border-gray-300 rounded-b-lg">
        <div></div>
        <p className="font-light text-xs text-gray-600 text-right mx-4">
          Not the results you expected? Give feedback or learn more
        </p>
      </div>
    </div>
  );
}
