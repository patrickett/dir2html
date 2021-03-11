import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

ReactDOM.render(
  <GeistProvider>
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </GeistProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();