import { useCss } from "kremling";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { navigateToUrl } from "single-spa";

import { fetchNews } from "@hfu-microfrontend/hfu-api";

export default function Dashboard() {
  const { t } = useTranslation();
  const scope = useCss(css);
  const courses = useSelector((state) => state.auth.courses);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const [news, setNews] = useState([]);

  const filteredNews = news.filter(
    (item) => item.course === "ALL" || courses.includes(item.course)
  );

  useEffect(() => {
    const f = async () => {
      const news = await fetchNews(email, token);
      setNews(news.news);
    };
    f();
  }, [email, token]);

  const navigate = (event) => {
    event.preventDefault();
    navigateToUrl("news");
  };

  return (
    <div className="dashboard-tile" {...scope}>
      <h2 onClick={navigate}>{t("dashboard.news")}</h2>
      <ul className="dashboard-items">
        {filteredNews.map((item) => (
          <li key={item._id}>
            <div role="button" className="link" tabIndex="0" onClick={navigate}>
              {item.title}
            </div>
            <div className="item-date">{item.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const css = `
& .dashboard-tile {
  width: 100%;
  height: 100%;
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
  display: flex;
}

.link {
  color: #168359;
  text-decoration: underline;
  cursor: pointer;
}
 
.item-date {
  margin-left: auto;
  color: #666;
  font-style: italic;
}  
`;
