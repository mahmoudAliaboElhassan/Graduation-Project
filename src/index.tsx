import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./routes/AppRouter";

import "./translation/i18next.ts";

import { store } from "./state/store";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import "mdb-ui-kit/css/mdb.min.css";

// const mymode = localStorage.getItem("mymode");
// if (localStorage.getItem("mymode") === "light") {
//   document.documentElement.classList.add("light-mode");
//   document.documentElement.classList.remove("dark-mode");
// } else {
//   document.documentElement.classList.add("dark-mode");
//   document.documentElement.classList.remove("light-mode");
// }

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <AppRouter />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
