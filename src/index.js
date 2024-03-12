import http from "node:http";
import { app } from "./app.js";

const server = http.createServer(app);

const PORT = 3000;

server.listen(3000, () => {
  console.log(`server listening on port ${PORT}`);
});
