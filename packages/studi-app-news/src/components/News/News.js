import { useCss } from "kremling";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { fetchNews } from "@hfu-microfrontend/hfu-api";

import Card from "../UI/Card";
import Dropdown from "../UI/Dropdown";
import { NewsItem } from "./NewsItem";

export default function News() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("ALL");
  const courses = useSelector((state) => state.auth.courses);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const [news, setNews] = useState([]);
  const filterChangeHandler = (value) => setFilter(value);
  const scope = useCss(css);

  useEffect(() => {
    const f = async () => {
      const news = await fetchNews(email, token);
      setNews(news.news);
    };
    f();
  }, [email, token]);

  let filteredNews = [];
  switch (filter) {
    case "ALL":
      filteredNews = news.filter(
        (item) => item.course === "ALL" || courses.includes(item.course)
      );
      break;
    case "COURSE":
      filteredNews = news.filter(
        (item) => item.course !== "ALL" && courses.includes(item.course)
      );
      break;
    default:
      filteredNews = news.filter(
        (item) => item.course === filter && courses.includes(item.course)
      );
  }

  const filters = [
    { value: "ALL", text: t("news.all") },
    { value: "COURSE", text: t("news.course_news") },
  ].concat(courses.map((item) => ({ value: item, text: item })));

  const cardContent =
    filteredNews.length === 0 ? (
      <p>{t("news.not_found")}</p>
    ) : (
      <ul>
        {filteredNews.map((item) => (
          <NewsItem
            key={item._id}
            title={item.title}
            course={item.course}
            description={item.description}
            date={item.date}
            author={item.author}
          />
        ))}
      </ul>
    );

  return (
    <section className="news" {...scope}>
      <div className="heading">
        <h1>{t("news.news")}</h1>
        <Dropdown
          onChangeHandler={filterChangeHandler}
          styling={"filter"}
          items={filters}
        />
      </div>
      <Card>{cardContent}</Card>
    </section>
  );
}

const css = `
& .news {
  max-width: 60rem;
  width: 90%;
  margin: 3rem auto;
}

& .news ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

& .heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

& .filter {
  width: 10rem;
  font: inherit;
  padding: 0.5rem;
  margin-left: 2rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`;
