import { useSelector } from "react-redux";

import Dashboard from "./Dashboard";

export default function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuth) {
    return null;
  }

  return <Dashboard />;
}
