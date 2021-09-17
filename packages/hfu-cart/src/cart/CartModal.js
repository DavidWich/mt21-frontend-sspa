import { useCss } from "kremling";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { fetchBooksById } from "@hfu-microfrontend/hfu-api";

import Modal from "./Modal";

export default function CartModal(props) {
  const { t } = useTranslation();
  const scope = useCss(css);
  const items = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await fetchBooksById(items, token);
      if (data.length > 0) setBooks([...data]);
    };
    if (items.length > 0) {
      fetchItems();
    } else {
      setBooks([]);
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <Modal onClose={props.onClose}>
        <h3>{t("cart.cart_is_empty")}.</h3>
      </Modal>
    );
  }

  return (
    <Modal onClose={props.onClose}>
      <ul className="list" {...scope}>
        {books.map((item) => (
          <li key={item._id}>
            <h3>{`${item.title} (${item.year})`}</h3>
            <div>{item.author}</div>
          </li>
        ))}
      </ul>
    </Modal>
  );
}

const css = `
& .list {
  list-style-type: none;
}

.list li {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}
`;
