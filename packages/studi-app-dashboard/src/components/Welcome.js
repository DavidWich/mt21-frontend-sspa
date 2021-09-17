import { useCss } from "kremling";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { initializeData } from "@hfu-microfrontend/hfu-api";
import LazyLoad from "react-lazyload";

export default function Welcome() {
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const scope = useCss(css);

  const initialize = async () => {
    await initializeData();
    alert("Data initialized");
  };

  if (isAuth) {
    return null;
  }

  return (
    <div className="welcome" {...scope}>
      <h1>{t("welcome.welcome")}!</h1>
      <button onClick={initialize}>{t("welcome.init")}</button>
      <LazyLoad>
        <img
          src="http://localhost:9200/img.webp"
          width="900px"
          height="600px"
          alt="Welcome"
        />
      </LazyLoad>
      <div style={{ height: "100vh", width: "100px" }} />
      <LazyLoad>
        <img
          src="http://localhost:9200/img2.webp"
          width="900px"
          height="300px"
          alt="Welcome 2"
        />
      </LazyLoad>
    </div>
  );
}

const css = `
& .welcome {
  max-width: 60rem;
  width: 90%;
  margin: 3rem auto;
}

& .welcome button {
  font: inherit;
  cursor: pointer;
  background-color: #0b8a59;
  border: 1px solid #076642;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
}
`;
