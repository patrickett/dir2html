import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { DirectoryEntry } from "../types/filelist";

const list: DirectoryEntry = {
  name: "root",
  file: 0,
  children: [
    {
      name: "node_modules",
      file: 0,
      children: [
        {
          name: "electron",
          file: 0,
          children: [
            {
              name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
              file: 0,
              children: [
                { children: null, file: 1, name: "simple file" },
                {
                  children: null,
                  file: 1,
                  name: "asdasdasasqwe12312ddddddddddddddddddddddddddddddddd",
                },
              ],
            },
            {
              name: "another file",
              file: 1,
              children: [{ children: null, file: 1, name: "Another file" }],
            },
          ],
        },
        {
          name: "another file",
          file: 1,
          children: null,
        },
        {
          name: "index.ts",
          file: 1,
          children: null,
        },
      ],
    },
    {
      name: "asd",
      file: 1,
      children: null,
    },
    {
      name: "another file",
      file: 1,
      children: null,
    },
    {
      name: "index.ts",
      file: 1,
      children: null,
    },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <Helmet>
          <script type="application/ld+json" id="filelist">
            {JSON.stringify(list)}
          </script>
        </Helmet>
      </HelmetProvider>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
