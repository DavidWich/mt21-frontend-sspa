import { useCss } from "kremling";
import React from "react";

export function MailItem(props) {
  const scope = useCss(css);

  return (
    <li className="single-mail-item" {...scope}>
      <div>
        <h3>{`${props.sender} (to: ${props.recipient})`}</h3>
        <div className="description">{props.subject}</div>
        <div className="description">{props.content}</div>
      </div>
    </li>
  );
}

const css = `
& .single-mail-item {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

.single-mail-item h3 {
  margin: 0 0 0.25rem 0;
}

.description {
  font-style: italic;
  margin-bottom: 0.5rem;
}
`;
