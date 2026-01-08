import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const mountNode =
  document.getElementById("instep-community-connect-root") ??
  document.getElementById("root");

if (!mountNode) {
  throw new Error("Could not find a mount node for the In Step Community Connect application.");
}

createRoot(mountNode).render(<App />);
