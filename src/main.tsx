import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider.tsx";
// import { ScrollContainer } from "react-nice-scroll";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import "react-nice-scroll/dist/styles.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.ts";
import router from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider>
          <PersistGate loading={null} persistor={persistor}>
            {/* <ScrollContainer> */}
            <RouterProvider router={router} />
            {/* </ScrollContainer> */}
          </PersistGate>
          <Toaster />
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
