import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./_app";

const rootELement = document.querySelector("#root") as HTMLElement;
const root = createRoot(rootELement);
root.render(<App />);
