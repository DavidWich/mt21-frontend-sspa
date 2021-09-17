import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import { i18next, store } from "@hfu-microfrontend/hfu-utility";

import MainNavigation from "./components/MainNavigation";

export default function Root() {
  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </I18nextProvider>
  );
}
