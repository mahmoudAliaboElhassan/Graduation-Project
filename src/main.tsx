import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import AppRouter from "./routes/AppRouter"

import "./translation/i18next.ts"

import { store } from "./state/store"
import { Provider } from "react-redux"
// import { PersistGate } from "redux-persist/integration/react";
import "mdb-ui-kit/css/mdb.min.css"
import { initSmoothScroll } from "./utils/smoothScroll"

window.addEventListener("DOMContentLoaded", () => {
  const lenis = initSmoothScroll()
  window.lenis = lenis
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <AppRouter />
      {/* </PersistGate> */}
    </Provider>
  </StrictMode>
)
