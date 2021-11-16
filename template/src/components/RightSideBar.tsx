import { DirectoryEntry } from "../../types/filelist";

interface RightSideBarProps {
  filelist: DirectoryEntry | null;
  tableItems: DirectoryEntry | null;
}

export default function RightSideBar({ tableItems }: RightSideBarProps) {
  const total = tableItems?.children?.length;
  const fileCount = tableItems?.children?.reduce(
    (r, e) => (e.file ? (r = r + 1) : 0),
    0
  );
  const num = (int?: number) => {
    if (!int) return null;
    return (
      <span className="w-4 h-4 px-2 py-1 ml-1 text-xs bg-gray-300 rounded-full">
        {int}
      </span>
    );
  };

  return (
    <div className="ml-4 md:w-1/4">
      <div className="hidden md:block">
        <p className="text-base font-semibold text-black">Information</p>
        <div className="pb-2 mt-4 border-b">
          <span className="text-sm lg:text-base">
            Generated {new Date(Date.now()).toDateString()}
          </span>
        </div>
      </div>
      <div className="px-6 py-6 -mx-10 border-b md:mx-0 md:px-0">
        <p className="text-base font-semibold text-black">Current Directory</p>
        <p>Total entries: {num(total) ?? "Unknown"}</p>
        <p>
          Folder count:{" "}
          {total && fileCount ? num(total - fileCount) : "Unknown"}
        </p>
        <p>File count: {num(fileCount) ?? "Unknown"}</p>
      </div>

      <div className="px-6 py-6 -mx-10 border-b md:mx-0 md:px-0">
        <p className="text-base font-semibold text-black">
          Total
          <span className="w-4 h-4 px-2 py-1 ml-1 text-xs bg-gray-300 rounded-full">
            109
          </span>
        </p>
      </div>
      <div className="px-6 py-6 -mx-10 border-b md:mx-0 md:px-0">
        <p className="text-base font-semibold text-black">Filetypes</p>
        <div className="w-full mt-4 bg-yellow-500 rounded-full shadow">
          <div className="w-11/12 py-1 text-xs leading-none text-center text-white bg-purple-800 rounded-full"></div>
        </div>
        <div className="flex mt-4">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 mr-2 bg-purple-800 rounded-full"></div>
            CSS 94.1 %
          </div>
          <div className="flex items-center ml-4 text-sm">
            <div className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></div>
            Javascript 5.9%
          </div>
        </div>
      </div>
    </div>
  );
}
