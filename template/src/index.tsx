import React from "react";
import ReactDOM from "react-dom";
import "./css/global.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { useState, useEffect } from "react";

function Application() {
  const [theme, setThemeType] = useState("light");
  const switchThemes = () => {
    setThemeType((last) => (last === "dark" ? "light" : "dark"));
  };
  // import and useEffect for setting document title for page
  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    if (theme !== "dark") return;
    setThemeType("dark");
  }, []);

  let themeObj = {
    toggle: switchThemes,
    current: theme,
  };

  return (
    <div>
      <GeistProvider themeType={theme}>
        <React.StrictMode>
          <CssBaseline />
          <App theme={themeObj} />
        </React.StrictMode>
      </GeistProvider>
    </div>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
