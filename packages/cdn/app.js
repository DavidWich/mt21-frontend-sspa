import express from "express";
import cors from "cors";
import compress from "compression";

const app = express();

app.use(express.json());
app.use(cors());
app.use(compress());
app.use(
  express.static("scripts", {
    maxAge: 86400000, // 1 day
  })
);

export default app;
