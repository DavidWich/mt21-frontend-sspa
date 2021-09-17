import { useCss } from "kremling";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { navigateToUrl } from "single-spa";

import { fetchUserEmails } from "@hfu-microfrontend/hfu-api";

import Card from "../UI/Card";
import { MailItem } from "./MailItem";

export default function Mail() {
  const { t } = useTranslation();
  const scope = useCss(css);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const f = async () => {
      if (email) {
        const emails = await fetchUserEmails(email, token);
        setEmails(emails.emails);
      }
    };
    f();
  }, [email, token]);

  const newEmailHandler = (event) => {
    event.preventDefault();
    navigateToUrl("/mail/new");
  };

  return (
    <section className="mail" {...scope}>
      <div className="heading">
        <h1>{t("mail.email")}</h1>
        <button id="mail_new" onClick={newEmailHandler}>
          {t("mail.new_email")}
        </button>
      </div>
      <Card>
        <ul>
          {emails.map((item) => (
            <MailItem
              key={item._id}
              sender={item.sender}
              recipient={item.recipient}
              subject={item.subject}
              content={item.content}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

const css = `
& .mail {
  max-width: 60rem;
  width: 90%;
  margin-left: 3rem;
}

.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.heading button {
  font: inherit;
  cursor: pointer;
  background-color: #0b8a59;
  border: 1px solid #076642;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
}

.mail ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
`;
