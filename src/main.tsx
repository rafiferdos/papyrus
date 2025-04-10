import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { ScrollContainer } from "react-nice-scroll";
import "react-nice-scroll/dist/styles.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
 
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <ScrollContainer>
          <RouterProvider router={router} />
          </ScrollContainer>
          </PersistGate>
        </Provider>
        <Toaster />
 
    </ThemeProvider>
  </StrictMode>
);
