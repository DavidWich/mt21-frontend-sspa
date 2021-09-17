import { useCss } from "kremling";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { navigateToUrl } from "single-spa";

import { authActions } from "@hfu-microfrontend/hfu-utility";
import { CartComponent } from "@hfu-microfrontend/hfu-cart";

import Dropdown from "./Dropdown";

export default function MainNavigation() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const scope = useCss(css);

  const navigate = (event) => {
    event.preventDefault();
    navigateToUrl(event.target.href);
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };

  const languageChangeHandler = (value) => {
    i18n.changeLanguage(value);
  };

  const languages = [
    { value: "en", text: "English" },
    { value: "de", text: "German" },
  ];
  const languageIndex = languages.findIndex((el) => el.value === i18n.language);
  languages[languageIndex].selected = true;

  return (
    <header className="header" {...scope}>
      <div className="logo">
        <a className="logo" href="/" onClick={navigate}>
          Studi-App
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <a id="nav_news" href="/news" onClick={navigate}>
              {t("header.news")}
            </a>
          </li>
          {isAuth && (
            <li>
              <a id="nav_bib" href="/bib" onClick={navigate}>
                {t("header.bib")}
              </a>
            </li>
          )}
          {isAuth && (
            <li>
              <a id="nav_mail" href="/mail" onClick={navigate}>
                {t("header.email")}
              </a>
            </li>
          )}
          {isAuth && (
            <li>
              <a id="nav_course" href="/course" onClick={navigate}>
                {t("header.courses")}
              </a>
            </li>
          )}
          {!isAuth && (
            <li>
              <a id="nav_login" href="/login" onClick={navigate}>
                {t("header.login")}
              </a>
            </li>
          )}
          {isAuth && (
            <li>
              <button id="nav_logout" onClick={logoutHandler}>
                {t("header.logout")}
              </button>
            </li>
          )}
          {isAuth && (
            <li>
              <span className="icon">
                <CartComponent />
              </span>
            </li>
          )}
          <li>
            <Dropdown
              onChangeHandler={languageChangeHandler}
              styling="filter"
              items={languages}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

const css = `
& .header {
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #18865c;
  padding: 0 10%;
}

& .logo a {
  font-size: 2rem;
  color: white;
  font-weight: bold;
  text-decoration: none;
}

& .icon {
  cursor: pointer;
  border: none;
  color: white;
  padding: 0.5rem 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
}

& .header nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: baseline;
}

& .header nav li {
  margin-left: 1.5rem;
}

& .header nav button,
& .header nav a {
  text-decoration: none;
  font-size: 1.5rem;
  color: white;
}

& .header nav button:hover,
& .header nav a:hover,
& .header nav a:active,
& .header nav a.active {
  color: brown;
  cursor: pointer;
}

& .header nav button {
  background-color: transparent;
  border: none;
}

& .filter {
  width: 8rem;
  background-color: transparent;
  border-color: white;
  color: white;
  font: inherit;
  padding: 0.5rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

& .filter option {
  color: black;
}
`;
