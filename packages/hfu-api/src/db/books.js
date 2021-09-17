import { backendApi } from "../constants";

export const fetchBooks = async (token) => {
  const res = await fetch(`${backendApi}/books`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "CONTENT-TYPE": "application/json",
    },
  });
  const data = await res.json();
  return [...data.books];
};

export const fetchBooksById = async (items, token) => {
  const res = await fetch(`${backendApi}/books`, {
    method: "POST",
    body: JSON.stringify({ items, token }),
    headers: {
      "CONTENT-TYPE": "application/json",
    },
  });
  const data = await res.json();
  return [...data.books];
};
