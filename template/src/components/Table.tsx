import { DirectoryEntry } from "../../types/filelist";
import TableItem from "./TableItem";

interface TableProps {
  pathParts: string[];
  tableItems: DirectoryEntry | null;
}

export default function Table({ pathParts, tableItems }: TableProps) {
  if (!tableItems) {
    return (
      <div>
        <p>There is no filelist</p>
      </div>
    );
  }

  return (
    <div className="text-center border-b border-l border-r rounded-b-lg md:block">
      {tableItems.children ? (
        tableItems.children.map((item, key) => TableItem(item, pathParts, key))
      ) : (
        <div className={`flex px-4 py-2 text-sm hover:bg-gray-200`}>
          <div className="w-full text-center">
            <p>Nothing here</p>
          </div>
        </div>
      )}
    </div>
  );
}
