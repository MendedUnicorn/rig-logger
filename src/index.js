import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import Provider from "./routers/AppRouter";
import "./styles/styles.scss";
import store from "./store/configureStore";
import { Provider as StoreProvider } from "react-redux";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <FluentProvider theme={webLightTheme}>
        <Provider />
      </FluentProvider>
    </StoreProvider>
  </React.StrictMode>
);
