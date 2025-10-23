import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Desktop } from "./screens/Desktop";
import { AuthProvider } from "./contexts/AuthContext";
import { Web3Provider } from "./contexts/Web3Provider";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Web3Provider>
      <AuthProvider>
        <Desktop />
      </AuthProvider>
    </Web3Provider>
  </StrictMode>,
);
