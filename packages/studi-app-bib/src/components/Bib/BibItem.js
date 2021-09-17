import React from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "@hfu-microfrontend/hfu-utility";
import { useCss } from "kremling";

export function BibItem(props) {
  const dispatch = useDispatch();
  const scope = useCss(css);

  const onAdd = (event) => {
    event.preventDefault();
    const json = { id: props.id };
    if (props.added) {
      dispatch(cartActions.removeItem(json));
    } else {
      dispatch(cartActions.addItem(json));
    }
  };

  return (
    <li className="single-bib-item" {...scope}>
      <div>
        <div className="side-bib-item">
          <h3>
            {props.title} ({props.year})
          </h3>
          <button onClick={onAdd}>{props.added ? "✓" : "+"}</button>
        </div>
        <div className="description">{props.author}</div>
        <div className="description">{props.isbn}</div>
      </div>
    </li>
  );
}

const css = `
& .single-bib-item {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

.single-bib-item div {
  width: 100%;
}

.single-bib-item h3 {
  margin: 0 1rem 0.25rem 0;
}

.description {
  font-style: italic;
}

.side-bib-item {
  display: flex;
  width: 100%;
}

.side-bib-item button {
  margin-left: auto;
  height: 2rem;
  width: 2rem;
  border-style: none;
  background-color: green;
  color: white;
  border-radius: 60%;
  font-size: 25px;
  cursor: pointer;
}
`;
