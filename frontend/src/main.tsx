import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CurrentPageProvider } from "./context/currentPage.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrentPageProvider>
      {/* Englobamos la aplicacion en el provider del CurrentPage para poder ir cambiando de pagina desde cualquier lugar de la aplicacion. */}
      <App/>
    </CurrentPageProvider>
  </StrictMode>
);
