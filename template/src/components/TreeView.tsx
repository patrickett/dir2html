import React from "react";
import "../css/index.css";
import { Tree } from "@geist-ui/react";

export default function TreeView() {
  return (
    <div>
      <Tree>
        <Tree.File name="package.json" />
        <Tree.Folder name="components">
          <Tree.File name="layout.js" />
          <Tree.Folder name="footer">
            <Tree.File name="footer.js" />
            <Tree.File name="footer-text.js" />
            <Tree.File name="footer-license.js" />
          </Tree.Folder>
          <Tree.File name="header.js" />
        </Tree.Folder>
        <Tree.File name="readme.md" />
      </Tree>
    </div>
  );
}
