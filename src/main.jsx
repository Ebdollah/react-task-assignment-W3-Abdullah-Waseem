import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import { MyProvider } from "./context/MyProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <MyProvider>
      <App />
    </MyProvider>
    </BrowserRouter>
  </StrictMode>
);
