import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../tailwind/tailwind.css";
import { App } from "./App";

const root = document.getElementById("root");
if (root === null) {
  throw new Error("React root element does not exist...?");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
