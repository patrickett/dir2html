import React from "react";
// import { Divider, Input } from "@geist-ui/react";
// import styles from "../css/index.module.css";
import DirListing from "./DirListing";
import TreeView from "./TreeView";
import { FileList } from "../App";
import Splitter from "m-react-splitters";
// import "m-react-splitters/lib/splitters.css";

export default function Main({ data }: { data: FileList }) {
  return (
    <div>
      <Splitter
        position="vertical"
        primaryPaneMinHeight={0}
        primaryPaneWidth="20%"
        primaryPaneMinWidth="0%"
        dispatchResize={true}
      >
        <TreeView data={data} />
        <DirListing data={data} />
      </Splitter>
    </div>
  );
}
