import http from "http";
import app from "./src/app.js";
import { initSocket } from "./src/sockets/socketManager.js";

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

// Inicializar el servidor de Socket.io
const socketServer = initSocket(server);

// Agregar el servidor de Socket.io a la aplicación
app.set("io", socketServer);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
