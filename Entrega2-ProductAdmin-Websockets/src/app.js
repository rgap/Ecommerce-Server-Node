import cors from "cors";
import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import cartRouter from "./routes/api/cart.router.js";
import productRouter from "./routes/api/product.router.js";
import HomeRouter from "./routes/views/home.router.js";
import RealTimeProductsRouter from "./routes/views/realtimeproducts.router.js";
import { __dirname } from "./utils/pathHelper.js";

const app = express();

app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Handlebars setup
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Socket middleware
app.use((req, res, next) => {
  req.io = app.get("io"); // Agregar el servidor de Socket.io a la solicitud
  next();
});

// Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Home route
app.use("/", HomeRouter);

// RealTimeProducts route
app.use("/realtimeproducts", RealTimeProductsRouter);

export default app;
