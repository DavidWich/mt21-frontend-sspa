import { useCss } from "kremling";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { navigateToUrl } from "single-spa";

import { fetchCoursesByMail } from "@hfu-microfrontend/hfu-api";

export default function Dashboard() {
  const { t } = useTranslation();
  const scope = useCss(css);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const f = async () => {
      if (email) {
        const data = await fetchCoursesByMail(email, token);
        if (data) {
          setCourses(data.courses);
        }
      }
    };
    f();
  }, [email]);

  const navigate = (course) => {
    navigateToUrl(`/course${course}`);
  };

  return (
    <div className="dashboard-tile" {...scope}>
      <h2 onClick={() => navigate("")}>{t("dashboard.courses")}</h2>
      <ul className="dashboard-items">
        {courses.map((item) => (
          <li key={item._id}>
            <div
              role="button"
              tabIndex="0"
              onClick={() => navigate(`/${item.abbreviation}`)}
            >
              {item.course}
            </div>
          </li>
        ))}
      </ul>
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
  color: #217052;
  text-decoration: underline;
  border-bottom: 1px solid #ccc;
  font-size: 1.17em;
}
  
.dashboard-items {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
  
.dashboard-items li {
  width: 95%;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  border-bottom: 1px solid #ccc;
  color: #168359;
  text-decoration: underline;
  cursor: pointer;
}
`;
