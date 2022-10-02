import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; //Импорт стилей
import { BrowserRouter as Router } from "react-router-dom"; //Импорт общей оболочки для роутинга

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router basename="/Table">
      {" "}
      {/*Оболочка роутинга и стартовая ссылка */}
      <App />
    </Router>
  </React.StrictMode>
);
