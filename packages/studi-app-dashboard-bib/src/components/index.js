import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import { i18next, store } from "@hfu-microfrontend/hfu-utility";

import App from "./App";

export default function Widget() {
  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  );
}
