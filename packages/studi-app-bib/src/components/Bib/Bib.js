import { useCss } from "kremling";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { fetchBooks } from "@hfu-microfrontend/hfu-api";

import Card from "../UI/Card";
import { BibItem } from "./BibItem";

export default function Bib() {
  const { t } = useTranslation();
  const scope = useCss(css);
  const cart = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const f = async () => {
      const data = await fetchBooks(token);
      if (data) {
        setBooks(data);
      }
    };
    f();
  }, []);

  return (
    <section className="bib" {...scope}>
      <h1>{t("bib.library")}</h1>
      <Card>
        <ul>
          {books.map((item) => (
            <BibItem
              key={item._id}
              id={item._id}
              title={item.title}
              author={item.author}
              year={item.year}
              isbn={item.isbn}
              added={cart.includes(item._id)}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

const css = `
& .bib {
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
}

.bib ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
`;
