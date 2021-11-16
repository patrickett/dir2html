import { Link } from "react-router-dom";

interface BreadCrumbProps {
  pathParts: string[];
}

export default function BreadCrumb({ pathParts }: BreadCrumbProps) {
  const seperator = (
    <span className="mx-1 text-xl font-medium text-gray-800">/</span>
  );

  const home = (
    <Link
      to="/"
      className="text-xl font-medium text-blue-700 mx-2 hover:underline"
    >
      /
    </Link>
  );

  return (
    <div className="flex items-center overflow-x-scroll">
      {home}
      {pathParts.map((part, i) => {
        return (
          <div key={i}>
            <Link
              className="text-xl font-medium text-blue-700 cursor-pointer hover:underline"
              to={`?path=${pathParts.slice(0, i + 1).join("/")}`}
            >
              {part}
            </Link>

            {i === pathParts.length - 1 ? null : seperator}
          </div>
        );
      })}
    </div>
  );
}
