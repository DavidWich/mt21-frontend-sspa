import { useCss } from "kremling";
import { useRef } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { navigateToUrl } from "single-spa";

import { fetchAuthState } from "@hfu-microfrontend/hfu-api";
import { authActions } from "@hfu-microfrontend/hfu-utility";

export default function Login() {
  const { t } = useTranslation();
  const [cookies, setCookie] = useCookies(["user"]);
  const scope = useCss(css);
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    fetchAuthState(
      email,
      password,
      () => navigateToUrl("/"),
      (token, courses) => {
        setCookie("token", token);
        setCookie("email", email);
        setCookie("courses", courses);
        dispatch(
          authActions.login({
            token: token,
            email: email,
            courses: courses,
          })
        );
      }
    );
  };

  return (
    <form className="auth" onSubmit={loginHandler} {...scope}>
      <div className="control">
        <label htmlFor="email">{t("auth.email")}</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          defaultValue="test@test.com"
        />
      </div>
      <div className="control">
        <label htmlFor="password">{t("auth.password")}</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          defaultValue="12345678"
        />
      </div>
      <button id="auth_login">{t("auth.login")}</button>
    </form>
  );
}

const css = `
& .auth {
  margin: 5rem auto;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  width: 25rem;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  background-color: #f4f0fa;
}

.control {
  margin-bottom: 0.5rem;
}

.control label {
  display: block;
  color: #616161;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.control input {
  display: block;
  width: 20rem;
  margin: auto;
  border-radius: 4px;
  padding: 0.25rem;
  border: 1px solid #ccc;
}

.auth button {
  font: inherit;
  cursor: pointer;
  background-color: #0b8a59;
  border: 1px solid #076642;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
}
`;
