import { useSelector } from "react-redux";
import { navigateToUrl } from "single-spa";

import Bib from "./Bib/Bib";

export default function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuth) {
    navigateToUrl("/");
    return null;
  }

  return <Bib />;
}
