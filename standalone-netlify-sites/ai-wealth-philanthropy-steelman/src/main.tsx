import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalDevelopmentApp from "./GlobalDevelopmentApp";
import AnimalWelfareApp from "./AnimalWelfareApp";
import HorizonApp from "./HorizonApp";
import "./styles.css";

const path = window.location.pathname;
const Page = path.startsWith("/long-horizon") ? HorizonApp
  : path.startsWith("/animal-welfare") ? AnimalWelfareApp
  : path.startsWith("/global-development") ? GlobalDevelopmentApp
  : App;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
