const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  express.static("dist", {
    maxAge: 86400000, // 1 day
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

module.exports = app;
