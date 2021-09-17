import { useCss } from "kremling";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { navigateToUrl } from "single-spa";

import { fetchBooks } from "@hfu-microfrontend/hfu-api";

export default function Dashboard() {
  const { t } = useTranslation();
  const scope = useCss(css);
  const [books, setBooks] = useState([]);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const f = async () => {
      const books = await fetchBooks(token);
      setBooks(books);
    };
    f();
  }, []);

  if (!isAuth) {
    return null;
  }

  const navigate = (event) => {
    event.preventDefault();
    navigateToUrl("/bib");
  };

  return (
    <div className="dashboard-tile" {...scope}>
      <h2 onClick={navigate}>{t("dashboard.bib")}</h2>
      <ul className="dashboard-items">
        {books.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

const css = `
& .dashboard-tile {
  width: 100%;
  height: 100%;
  margin: 0;
}

.dashboard-tile h2 {
  margin: 0;
  padding-bottom: 0.5rem;
  cursor: pointer;
  color: #217052;
  text-decoration: underline;
  border-bottom: 1px solid #ccc;
  font-size: 1.17em;
}
  
.dashboard-items {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
  
.dashboard-items li {
  width: 95%;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  border-bottom: 1px solid #ccc;
}
`;
