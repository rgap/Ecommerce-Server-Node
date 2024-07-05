import express from "express";
import ProductManager from "./class/productManager.js";
import UserRouter from "./routes/users.router.js";
import { __dirname } from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/api/user", UserRouter);

const productManager = new ProductManager();

// // Root endpoint
// app.get("/api/user", (req, res) => {
//   //   const {nombre,edad} = req.query
//   //   res.send("Hello World!");
//   res.status(202).json({ message: "Todo ok!" });
// });

// app.get("/api/user/:userId", (req, res) => {
//   console.log(req.params.userId);
//   res.send(`User ${userId}`);
// });

app.post("/", async (req, res) => {
  await productManager.addProduct();
  res.status(201).json({ message: "Product added" });
});

console.log(__dirname);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
