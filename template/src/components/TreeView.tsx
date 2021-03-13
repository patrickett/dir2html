import React from "react";
import "../css/index.module.css";
import { Tree } from "@geist-ui/react";
import styles from "../css/index.module.css";
import { FileList, DirentJson } from "../App";

function direntView(dirent: DirentJson) {
  if (dirent.type === "dir") {
    return (
      <Tree.Folder key={dirent.name} name={dirent.name}>
        {dirent.children!.map((dirent) => {
          return direntView(dirent);
        })}
      </Tree.Folder>
    );
  } else {
    return <Tree.File key={dirent.name} name={dirent.name} />;
  }
}

export default function TreeView({ data }: { data: FileList }) {
  return (
    <div className={styles.treeView}>
      <Tree>
        {data.root.children!.map((dirent) => {
          return direntView(dirent);
        })}
        {/* <Tree.File name="package.json" />
        <Tree.Folder name="components">
          <Tree.File name="layout.js" />
          <Tree.Folder name="footer">
            <Tree.File name="footer.js" />
            <Tree.File name="footer-text.js" />
            <Tree.File name="footer-license.js" />
          </Tree.Folder>
          <Tree.File name="header.js" />
        </Tree.Folder>
        <Tree.File name="readme.md" /> */}
      </Tree>
    </div>
  );
}
