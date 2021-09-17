import { useCss } from "kremling";
import { useTranslation } from "react-i18next";

import { DashboardBib } from "@hfu-microfrontend/studi-app-dashboard-bib";
import { DashboardCourse } from "@hfu-microfrontend/studi-app-dashboard-course";
import { DashboardMail } from "@hfu-microfrontend/studi-app-dashboard-mail";
import { DashboardNews } from "@hfu-microfrontend/studi-app-dashboard-news";

import Card from "./Card";

export default function Dashboard() {
  const { t } = useTranslation();
  const scope = useCss(css);

  return (
    <section className="dashboard" {...scope}>
      <h1
        style={{
          maxWidth: "60rem",
          width: "90%",
          margin: "2rem 0",
        }}
      >
        {t("dashboard.title")}
      </h1>
      <div className="side">
        <Card styles="single">
          <DashboardNews />
        </Card>
        <Card styles="single">
          <DashboardCourse />
        </Card>
      </div>
      <div className="side">
        <Card styles="single">
          <DashboardMail />
        </Card>
        <Card styles="single">
          <DashboardBib />
        </Card>
      </div>
    </section>
  );
}

const css = `
.dashboard {
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
}

.side {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.single {
  margin-bottom: 1rem;
  width: 45%;
  height: 15rem;
}
`;
