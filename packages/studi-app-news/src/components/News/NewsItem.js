import { useCss } from "kremling";
import React from "react";
import { navigateToUrl } from "single-spa";

export function NewsItem(props) {
  const scope = useCss(css);

  const onClickHandler = (event) => {
    event.preventDefault();

    const course =
      props.course !== "ALL" && props.course.length > 0
        ? `/${props.course}`
        : "";

    navigateToUrl(`/course${course}`);
  };

  const parseCourse = (course) =>
    course === "ALL" || course.length === 0 ? (
      ""
    ) : (
      <button
        className={"course"}
        onClick={onClickHandler}
      >{`[${course}]`}</button>
    );

  return (
    <li className={"single"} {...scope}>
      <div>
        <div className={"headline"}>
          <h2>{props.title}</h2>
          {parseCourse(props.course)}
        </div>
        <div className={"description"}>{props.description}</div>
        <div className={"author"}>
          - {props.author} ({props.date})
        </div>
      </div>
    </li>
  );
}

const css = `
& .single {
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

.single h2 {
  margin: 0 0 0.25rem 0;
  font-size: 18px;
}

.course {
  color: #096829;
  cursor: pointer;
  font-size: 16px;
  border: none;
}

.headline {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.description {
  font-style: italic;
}

.author {
  font-style: italic;
  text-align: right;
}
`;
