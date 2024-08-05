import http from "http";
import app from "./src/app.js";
import { initSocket } from "./src/sockets/socketManager.js";

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

// Initialize one socket
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
