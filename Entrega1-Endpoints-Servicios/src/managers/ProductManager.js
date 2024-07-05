import fs from "fs";
import path from "path";
import { __dirname } from "../utils/pathHelper.js";

class ProductManager {
  constructor() {
    this.filePath = path.join(__dirname, "../data/products.json");
  }

  async getAllProducts(limit) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      let products = JSON.parse(data);
      if (limit) {
        products = products.slice(0, limit);
      }
      return products;
    } catch (error) {
      console.error("Error reading products:", error);
      return [];
    }
  }

  async getProductById(productId) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      const products = JSON.parse(data);
      const productFound = products.find(product => Number(product.id) == Number(productId));
      return productFound;
    } catch (error) {
      console.error("Error reading product:", error);
      return null;
    }
  }

  async addProduct(product) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      const products = JSON.parse(data);
      const newProduct = { id: Date.now().toString(), ...product };
      products.push(newProduct);
      await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      console.error("Error adding product:", error);
      return null;
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      const products = JSON.parse(data);
      const index = products.findIndex(product => Number(product.id) == Number(productId));
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return products[index];
      }
      return null;
    } catch (error) {
      console.error("Error updating product:", error);
      return null;
    }
  }

  async deleteProduct(productId) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      let products = JSON.parse(data);
      products = products.filter(product => Number(product.id) != Number(productId));
      await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  }
}

export default ProductManager;
