import React, { useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import { i18next, store } from "@hfu-microfrontend/hfu-utility";

import Cart from "./cart/Cart";
import CartModal from "./cart/CartModal";

export function CartComponent() {
  const [showModal, setShowModal] = useState(false);

  const onClickHandler = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const onCloseHandler = (event) => {
    event.preventDefault();
    setShowModal(false);
  };

  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <Cart onClick={onClickHandler} />
        {showModal && <CartModal onClose={onCloseHandler} />}
      </Provider>
    </I18nextProvider>
  );
}
