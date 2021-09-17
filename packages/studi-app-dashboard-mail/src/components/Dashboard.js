import { useCss } from "kremling";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { navigateToUrl } from "single-spa";

import { fetchUserEmails } from "@hfu-microfrontend/hfu-api";

export default function EmailDashboard() {
  const { t } = useTranslation();
  const scope = useCss(css);
  const [emails, setEmails] = useState([]);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const f = async () => {
      if (email) {
        const emails = await fetchUserEmails(email, token);
        setEmails(emails.emails);
      }
    };
    f();
  }, [email]);

  const navigate = (event) => {
    event.preventDefault();
    navigateToUrl("/mail");
  };

  return (
    <div className="dashboard-tile" {...scope}>
      <h2 onClick={navigate}>{t("dashboard.mails")}</h2>
      <div className="content">{`${t("dashboard.mail_count")}: ${
        emails.length
      }`}</div>
    </div>
  );
}

const css = `
& .dashboard-tile {
  width: 100%;
  height: 100%;
  margin: 0;
}

.dashboard-tile h2 {
  margin: 0;
  padding-bottom: 0.5rem;
  cursor: pointer;
  color: #0b8b5a;
  text-decoration: underline;
  border-bottom: 1px solid #ccc;
  font-size: 1.17em;
}

.content {
  margin-top: 1rem;
}
`;
