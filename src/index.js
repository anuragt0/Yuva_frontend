import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from 'react-router-dom'



import App from "./App";
import "./css/common/vars.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //  <React.StrictMode>

<HashRouter>
  <App/>
</HashRouter>
  // </React.StrictMode>
);
