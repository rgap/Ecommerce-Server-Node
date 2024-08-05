import { Server } from "socket.io";
import ProductManager from "../managers/ProductManager.js";

const productManager = new ProductManager();

export const initSocket = server => {
  const io = new Server(server);

  io.on("connection", socket => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    // Al agregar un producto desde el cliente
    socket.on("addProduct", async product => {
      try {
        const savedProduct = await productManager.addProduct(product);
        if (savedProduct) {
          io.emit("productAdded", savedProduct);
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    });

    // Al borrar un producto desde el cliente
    socket.on("removeProduct", async productId => {
      try {
        const success = await productManager.deleteProduct(productId);
        if (success) {
          io.emit("productRemoved", productId);
        }
      } catch (error) {
        console.error("Error removing product:", error);
      }
    });
  });
};
