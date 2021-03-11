import React from "react";
// import { Divider, Input } from "@geist-ui/react";
import "../css/index.css";
import DirListing from "./DirListing";
import TreeView from "./TreeView";

import Splitter from "m-react-splitters";
// import "m-react-splitters/lib/splitters.css";

export default function Main() {
  return (
    <div className="h-full">
      <Splitter
        position="vertical"
        primaryPaneMinHeight={0}
        primaryPaneWidth="20%"
        primaryPaneMinWidth="0%"
        dispatchResize={true}
      >
        <TreeView />
        <DirListing />
      </Splitter>
    </div>
  );
}
