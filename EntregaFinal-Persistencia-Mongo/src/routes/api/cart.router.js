import { Router } from "express";
import CartManager from "../../managers/CartManager.js";

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
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.addProductToCart(cid, pid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

export default router;
