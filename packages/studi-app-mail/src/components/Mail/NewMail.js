import { useCss } from "kremling";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { navigateToUrl } from "single-spa";

import { newEmail } from "@hfu-microfrontend/hfu-api";
import { useSelector } from "react-redux";

export default function NewMail(props) {
  const { t } = useTranslation();
  const scope = useCss(css);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const params = new URLSearchParams(props.location.search);
  const recipient = params.get("mailto");
  const recipientRef = useRef();
  const subjectRef = useRef();
  const contentRef = useRef();

  const navigate = () => {
    navigateToUrl("/mail");
  };

  const backHandler = (event) => {
    event.preventDefault();
    navigate();
  };

  const newEmailHandler = async (event) => {
    event.preventDefault();

    await newEmail(
      email,
      recipientRef.current.value,
      subjectRef.current.value,
      contentRef.current.value,
      token
    );

    navigate();
  };

  return (
    <form className="new-mail" onSubmit={newEmailHandler} {...scope}>
      <div className="side">
        <button onClick={backHandler}>{t("mail.back")}</button>
        <button>{t("mail.send")}</button>
      </div>
      <div className="control">
        <label htmlFor="recipient">{t("mail.recipient")}</label>
        <input
          type="email"
          id="recipient"
          ref={recipientRef}
          defaultValue={recipient}
        />
      </div>
      <div className="control">
        <label htmlFor="subject">{t("mail.subject")}</label>
        <input type="text" id="subject" ref={subjectRef} />
      </div>
      <div className="control">
        <label htmlFor="content">{t("mail.content")}</label>
        <textarea rows="20" id="content" ref={contentRef} />
      </div>
    </form>
  );
}

const css = `
& .new-mail {
  margin-left: 5rem;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  width: 50rem;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  background-color: #f4f0fa;
}

.control {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
}

.control label {
  display: inline-block;
  color: #616161;
  text-transform: uppercase;
  width: 20%;
  margin-right: auto;
  text-align: left;
}

.control textarea,
.control input {
  display: inline-block;
  width: 100%;
  border-radius: 4px;
  padding: 0.25rem;
  border: 1px solid #ccc;
}

.control textarea {
  resize: none;
}

.side {
  align-items: flex-start;
  display: flex;
}

.side button {
  font: inherit;
  cursor: pointer;
  background-color: #0b8a59;
  border: 1px solid #076642;
  color: white;
  padding: 0.5rem 1.5rem;
  margin: 0.5rem;
  border-radius: 6px;
}
`;
