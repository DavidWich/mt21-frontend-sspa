import { useCss } from "kremling";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { navigateToUrl } from "single-spa";

import { fetchCourse } from "@hfu-microfrontend/hfu-api";

export default function CourseDetail() {
  const { t } = useTranslation();
  const scope = useCss(css);
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [courseData, setCourseData] = useState({});

  const sendMailHandler = (event) => {
    event.preventDefault();
    navigateToUrl(
      `/mail/new?mailto=${courseData.abbreviation}@my-university.de`
    );
  };

  useEffect(() => {
    const f = async () => {
      const data = await fetchCourse(id, token);
      if (data.courseData) {
        setCourseData(data.courseData);
      } else {
        navigateToUrl(`/course/error?course=${data.abbreviation}`);
      }
    };
    f();
  }, [id]);

  return (
    <div className="course-detail" {...scope}>
      <div className="inline">
        <h1>
          {courseData.course} ({courseData.abbreviation})
        </h1>
        <button onClick={sendMailHandler}>{t("courses.send_mail")}</button>
      </div>
      <h3>
        {t("courses.lecturer")}: {courseData.professor}
      </h3>
      <p>
        {t("courses.enrolled")}: {courseData.currentPeople}/
        {courseData.maxPeople}
      </p>
    </div>
  );
}

const css = `
& .course-detail {
  margin-left: 5rem;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  width: 50rem;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f4f0fa;
}

.inline {
  display: flex;
  justify-content: space-between;
}

.inline h1 {
  display: inline-block;
  text-align: left;
  margin-right: auto;
  width: 75%;
}

.inline button {
  display: inline-block;
  font: inherit;
  cursor: pointer;
  background-color: #0b8a59;
  border: 1px solid #076642;
  color: white;
  padding: 0.75rem 0.75rem;
  border-radius: 6px;
  width: fit-content;
  height: fit-content;
  margin-top: 1.5rem;
}
`;
