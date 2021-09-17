import { backendApi } from "../constants";

export const fetchNews = async (email, token) =>
  await fetch(`${backendApi}/news`, {
    method: "POST",
    body: JSON.stringify({ email, token }),
    headers: { "CONTENT-TYPE": "application/json" },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error fetching news");
    }
  });
