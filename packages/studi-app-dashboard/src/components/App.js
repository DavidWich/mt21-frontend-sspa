import { useSelector } from "react-redux";

import Dashboard from "./Dashboard";
import Welcome from "./Welcome";

export default function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuth) {
    return <Welcome />;
  }

  return <Dashboard />;
}
