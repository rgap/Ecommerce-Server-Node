import fs from "fs";
import path from "path";
import { __dirname } from "../utils/pathHelper.js";

class CartManager {
  constructor() {
    this.filePath = path.join(__dirname, "data/carts.json");
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
      return carts.find(cart => Number(cart.id) == Number(cartId));
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

  async addProductToCart(cartId, productId) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      const carts = JSON.parse(data);
      const cart = carts.find(cart => Number(cart.id) == Number(cartId));
      if (cart) {
        const productIndex = cart.products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
          cart.products[productIndex].quantity += 1;
        } else {
          cart.products.push({ id: productId, quantity: 1 });
        }
        await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
        return cart;
      }
      return null;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return null;
    }
  }
}

export default CartManager;
