import React from "react";
import { useTranslation } from "react-i18next";

export default function CourseError(props) {
  const { t } = useTranslation();
  const params = new URLSearchParams(props.location.search);

  const course = params.get("course");

  const errorMessage = course
    ? `${t("courses.course")} '${course}' ${t("courses.not_found")}!`
    : t("courses.error_default");

  return (
    <>
      <h1>{t("courses.error")}</h1>
      <p>{errorMessage}</p>
    </>
  );
}
