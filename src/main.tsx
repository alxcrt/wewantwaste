import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SkipProvider } from "./providers/skip-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SkipProvider>
      <App />
    </SkipProvider>
  </StrictMode>
);
