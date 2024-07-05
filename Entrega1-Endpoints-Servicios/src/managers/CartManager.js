import fs from "fs";
import path from "path";
import { __dirname } from "../utils/pathHelper.js";

class CartManager {
  constructor() {
    this.filePath = path.join(__dirname, "../data/carts.json");
  }

  async createCart() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      const carts = JSON.parse(data);
      const newCart = { id: Date.now().toString(), products: [] };
      carts.push(newCart);
      await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
      return newCart;
    } catch (error) {
      console.error("Error creating cart:", error);
      return null;
    }
  }

  async getCartById(cartId) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      const carts = JSON.parse(data);
      return carts.find(cart => cart.id === cartId);
    } catch (error) {
      console.error("Error reading cart:", error);
      return null;
    }
  }

  async getAllCarts() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading carts:", error);
      return [];
    }
  }
}

export default CartManager;
