import React from "react";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "./store/StoreProvider.jsx";
import { App } from "./App.jsx";
import "./styles.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
