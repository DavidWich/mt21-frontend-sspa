import { useCss } from "kremling";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { fetchCoursesByMail } from "@hfu-microfrontend/hfu-api";

import Card from "../UI/Card";
import { CourseItem } from "./CourseItem";

export default function Course() {
  const { t } = useTranslation();
  const scope = useCss(css);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const f = async () => {
      if (email) {
        const data = await fetchCoursesByMail(email, token);
        if (data) {
          setCourses(data.courses);
        }
      }
    };
    f();
  }, [email]);

  return (
    <section className="course" {...scope}>
      <h1>{t("courses.courses")}</h1>
      <Card>
        <ul>
          {courses.map((item) => (
            <CourseItem
              key={item._id}
              course={item.course}
              abbreviation={item.abbreviation}
              professor={item.professor}
              currentPeople={item.currentPeople}
              maxPeople={item.maxPeople}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

const css = `
& .course {
  max-width: 60rem;
  width: 90%;
  margin: 3rem auto;
}

.course ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
`;
