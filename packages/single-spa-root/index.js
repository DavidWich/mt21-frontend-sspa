const http = require("http");
const app = require("./app");

const server = http.createServer(app);

app.listen(9000);
