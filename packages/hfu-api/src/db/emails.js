import { backendApi } from "../constants";

export const fetchUserEmails = async (email, token) =>
  await fetch(`${backendApi}/emails`, {
    method: "POST",
    body: JSON.stringify({ email, token }),
    headers: { "CONTENT-TYPE": "application/json" },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error fetching individual email data");
    }
  });

export const newEmail = async (sender, recipient, subject, content, token) =>
  await fetch(`${backendApi}/new-email`, {
    method: "POST",
    body: JSON.stringify({ sender, recipient, subject, content, token }),
    headers: {
      "CONTENT-TYPE": "application/json",
    },
  });
