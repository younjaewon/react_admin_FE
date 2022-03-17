import "./App.css";
import "./reset.css"; 
import HEADER from "./component/header/header";
import Router from "./routes";
import Side from "./component/Side";
import React from "react";
import Context from "./Context";

export default function App() {
  return (
    <>
      <Context>
        <HEADER />
        <Side />
        <Router />
      </Context>
    </>
  );
}
