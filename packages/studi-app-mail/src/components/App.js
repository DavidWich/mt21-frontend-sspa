import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { navigateToUrl } from "single-spa";

import Mail from "./Mail/Mail";
import NewMail from "./Mail/NewMail";

export default function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuth) {
    navigateToUrl("/");
    return null;
  }

  return (
    <div style={{ maxWidth: "60rem", width: "90%", margin: "3rem auto" }}>
      <BrowserRouter>
        <Switch>
          <Route path="/mail" component={Mail} exact />
          <Route path="/mail/new" component={NewMail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
