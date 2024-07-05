import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
  const carts = await cartManager.getAllCarts();
  res.json(carts);
});

router.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  if (newCart) {
    res.status(201).json(newCart);
  } else {
    res.status(500).json({ message: "Error creating cart" });
  }
});
router.get("/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const cart = await cartManager.getCartById(cartId);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

router.post("/:cartId/product/:productId", async (req, res) => {
  const { cartId, productId } = req.params;
  const cart = await cartManager.addProductToCart(cartId, productId);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

export default router;
