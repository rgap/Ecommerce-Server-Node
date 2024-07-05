import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getAllProducts(limit);
  res.json(products);
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await productManager.getProductById(productId);
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

router.put("/:productId", async (req, res) => {
  const { productId } = req.params;
  const updatedProduct = req.body;
  const product = await productManager.updateProduct(productId, updatedProduct);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  const success = await productManager.deleteProduct(productId);
  if (success) {
    res.json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;
