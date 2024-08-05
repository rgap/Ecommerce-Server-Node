import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import cartRouter from "./routes/api/cart.router.js";
import productRouter from "./routes/api/product.router.js";
import adminRouter from "./routes/views/admin.router.js";
import { __dirname } from "./utils/pathHelper.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Handlebars setup
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

// Routes
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

// Home route
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.render("home");
});

export default app;
