import React from "react";
import "./css/index.css";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="container mx-auto h-full">
      <Header />
      <Main />
    </div>
  );
}
