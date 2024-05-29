import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchText.tsx";
import { ToastContainer } from "react-toastify";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          limit={3}
          position="top-right"
          autoClose={2000}
          pauseOnFocusLoss={false}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="colored"
          icon={false}
        />
        <SearchProvider>
          <App />
        </SearchProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
