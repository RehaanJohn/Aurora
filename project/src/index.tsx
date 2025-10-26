import { Buffer } from "buffer";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Desktop } from "./screens/Desktop";
import { AuthProvider } from "./contexts/AuthContext";
import { Web3Provider } from "./contexts/Web3Provider";

// Make Buffer available globally for Node.js packages
window.Buffer = Buffer;

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Web3Provider>
      <AuthProvider>
        <Desktop />
      </AuthProvider>
    </Web3Provider>
  </StrictMode>
);
