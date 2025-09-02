import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import moment from "moment";
import "moment/locale/ar"; // import Arabic locale
moment.locale("ar"); // ✅ Global Arabic locale

// import i18n (needs to be bundled ;))
import "./i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
