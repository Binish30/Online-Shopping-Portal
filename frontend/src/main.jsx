import App from "./App.jsx";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import ShopContextProvider from "./context/ShopContext.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
          <App />
      </ShopContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
