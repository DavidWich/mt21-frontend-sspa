import { backendApi } from "../constants";

export const fetchCourse = async (course, token) =>
  await fetch(`${backendApi}/course/${course}`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: { "CONTENT-TYPE": "application/json" },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error fetching course data");
    }
  });

export const fetchCoursesByMail = async (email, token) =>
  await fetch(`${backendApi}/coursesByMail`, {
    method: "POST",
    body: JSON.stringify({ email, token }),
    headers: { "CONTENT-TYPE": "application/json" },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error fetching course data");
    }
  });

export const fetchUserCourses = async (email, token) =>
  await fetch(`${backendApi}/courses`, {
    method: "POST",
    body: JSON.stringify({ email, token }),
    headers: { "CONTENT-TYPE": "application/json" },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error fetching individual course data");
    }
  });
