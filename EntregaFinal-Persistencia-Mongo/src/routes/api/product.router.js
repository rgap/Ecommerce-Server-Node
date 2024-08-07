import { Router } from "express";
import ProductManager from "../../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getAllProducts(limit);
  res.json(products);
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.post("/", async (req, res) => {
  const newProduct = req.body;
  const createdProduct = await productManager.addProduct(newProduct);
  res.status(201).json(createdProduct);
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;
  const product = await productManager.updateProduct(pid, updatedProduct);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const success = await productManager.deleteProduct(pid);
  if (success) {
    res.json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;
