import * as http from "http";
import app from "./app.js";

const server = http.createServer(app);

app.listen(8999);
