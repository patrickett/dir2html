import { useEffect, useState } from "react";
import { DirectoryEntry } from "../types/filelist";
import Home from "./components/Home";

export default function App() {
  let [filelist, setFilelist] = useState<DirectoryEntry | null>(null);

  useEffect(() => {
    const jsonText = document.getElementById("filelist")?.innerText;
    const filelist: DirectoryEntry | null = jsonText
      ? JSON.parse(jsonText)
      : null;

    setFilelist(filelist);
  }, []);

  return <Home filelist={filelist} />;
}
