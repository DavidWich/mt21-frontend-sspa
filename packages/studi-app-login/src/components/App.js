import { useSelector } from "react-redux";
import { navigateToUrl } from "single-spa";

import Login from "./Auth/Login";

export default function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  if (isAuth) {
    navigateToUrl("/");
    return null;
  } else {
    return <Login />;
  }
}
