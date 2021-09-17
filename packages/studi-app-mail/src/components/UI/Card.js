import { useCss } from "kremling";
import React from "react";

export default function Card(props) {
  const scoped = useCss(css);

  return (
    <div className={`card ${props.styles}`} {...scoped}>
      {props.children}
    </div>
  );
}

const css = `
& .card {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  padding: 1rem;
}
`;
