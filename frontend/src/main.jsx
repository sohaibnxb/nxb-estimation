import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import store from "./redux/store"
import { persistor } from "./redux/store";

import "./assets/fonts/SegoeUI/fonts.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);