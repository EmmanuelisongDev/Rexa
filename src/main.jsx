import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/index.js";
import fbconfig from "./fbconfig.js";

import "./index.css";

import { initializeApp } from "firebase/app";

const app = initializeApp(fbconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster />
    <App />
  </Provider>
);
