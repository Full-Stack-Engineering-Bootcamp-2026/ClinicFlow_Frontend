import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { Provider } from "react-redux";
import { store, persistor } from "@/app/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { TooltipProvider } from "@/components/ui/tooltip";
import {  RouterProvider } from "react-router-dom"
import { router } from "./routes/index.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
          <RouterProvider router={router} />

    </TooltipProvider>
  </StrictMode>
);