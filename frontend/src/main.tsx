import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CurrentPageProvider } from "./context/currentPage.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrentPageProvider>
      <App/>
    </CurrentPageProvider>
  </StrictMode>
);
