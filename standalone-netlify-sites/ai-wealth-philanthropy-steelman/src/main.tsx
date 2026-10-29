import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalDevelopmentApp from "./GlobalDevelopmentApp";
import AnimalWelfareApp from "./AnimalWelfareApp";
import "./styles.css";

const Page = window.location.pathname.startsWith("/animal-welfare") ? AnimalWelfareApp : window.location.pathname.startsWith("/global-development") ? GlobalDevelopmentApp : App;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
