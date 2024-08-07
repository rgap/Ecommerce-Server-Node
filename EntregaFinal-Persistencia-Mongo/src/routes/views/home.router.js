import { Router } from "express";
import ProductManager from "../../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

// Lista de productos
router.get("/", async (req, res) => {
  try {
    // Productos de la base de datos
    const products = await productManager.getAllProducts();
    res.render("home", { products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
