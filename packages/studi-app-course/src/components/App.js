import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { navigateToUrl } from "single-spa";

import Course from "./Course/Course";
import CourseDetail from "./Course/CourseDetail";
import CourseError from "./Course/CourseError";

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
          <Route path="/course" component={Course} exact />
          <Route path="/course/error" component={CourseError} />
          <Route path="/course/:id" component={CourseDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
