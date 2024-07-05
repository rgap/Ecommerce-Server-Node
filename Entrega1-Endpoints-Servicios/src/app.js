import express from "express";
import cartsRouter from "./routes/cart.router.js";
import productsRouter from "./routes/product.router.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

export default app;
