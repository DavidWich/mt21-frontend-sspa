import { authService } from "../constants";
import { fetchUserCourses } from "../db/courses";

export const fetchAuthState = async (email, password, redirect, login) => {
  fetch(`${authService}/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "CONTENT-TYPE": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const errorMessage =
            (data && data.error && data.error.message) ||
            "Authentication failed!";
          throw new Error(errorMessage);
        });
      }
    })
    .then(async (token) => {
      const courses = await fetchUserCourses(email, token);
      login(token, courses.courses);
      redirect();
    })
    .catch((err) => alert(err));
};
