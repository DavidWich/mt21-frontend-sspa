import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import { i18next, store } from "@hfu-microfrontend/hfu-utility";

import App from "./components/App";

export default function Root() {
  return (
    <div style={{ maxWidth: "60rem", width: "90%", margin: "3rem auto" }}>
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nextProvider>
    </div>
  );
}
