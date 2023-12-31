import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StateContext } from "./StateContext";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SkeletonTheme baseColor="#313131" highlightColor="#525252">
    <BrowserRouter>
      <StateContext>
        <Toaster />
        <App />
      </StateContext>
    </BrowserRouter>
  </SkeletonTheme>
);
