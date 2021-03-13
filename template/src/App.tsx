import React from "react";
import styles from "./css/index.module.css";
import Header from "./components/Header";
import Main from "./components/Main";

export interface FileList {
  operation: Opertaion;
  root: DirentJson;
}

interface Opertaion {
  files: number;
  folders: number;
  estimated_size: number;
  total_size: number;
}

export interface DirentJson {
  type: "dir" | "file";
  name: string;
  path: string;
  size: number;
  modified: number;
  created: number;
  children: null | DirentJson[];
}

function vaildJson(str: string): FileList | false {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

export default function App({
  theme,
}: {
  theme: { toggle: Function; current: string };
}) {
  const element = document.getElementById("data");
  if (element) {
    const jsonData = vaildJson(element.innerText);
    if (jsonData) {
      return (
        <div className={`${styles.mxAuto} ${styles.container} `}>
          <Header theme={theme} data={jsonData} />
          <Main data={jsonData} />
        </div>
      );
    }
  }
  return (
    <div className={`${styles.mxAuto} ${styles.container} ${styles.hFull}`}>
      <p>This template does not have any data</p>
    </div>
  );
}
