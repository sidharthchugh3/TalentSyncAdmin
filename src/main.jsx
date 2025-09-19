import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";   // <-- import Provider
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store";    // <-- import store

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>   {/* <-- wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>
);
