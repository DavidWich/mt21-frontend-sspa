import { useCss } from "kremling";
import React from "react";
import { useTranslation } from "react-i18next";
import { navigateToUrl } from "single-spa";

export function CourseItem(props) {
  const { t } = useTranslation();
  const scope = useCss(css);

  const navigate = (event) => {
    event.preventDefault();
    navigateToUrl(`/course/${props.abbreviation}`);
  };

  return (
    <li className="single" {...scope}>
      <div>
        <h3
          id={`course_${props.abbreviation}`}
          onClick={navigate}
        >{`${props.course} (${props.abbreviation})`}</h3>
        <div className="description">{props.professor}</div>
        <div className="description">
          {props.currentPeople}/{props.maxPeople} {t("courses.people")}
        </div>
      </div>
    </li>
  );
}

const css = `
& .single {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

.single h3 {
  margin: 0 0 0.25rem 0;
  color: #217052;
  text-decoration: underline;
  cursor: pointer;
}

.description {
  font-style: italic;
}  
`;
