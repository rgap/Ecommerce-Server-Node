const socket = io();

socket.on("productAdded", product => {
  const productList = document.getElementById("product-list");
  const newProduct = document.createElement("li");
  newProduct.textContent = `${product.title} - $${product.price}`;
  newProduct.id = product.id;
  productList.appendChild(newProduct);
});

socket.on("productRemoved", productId => {
  const productList = document.getElementById("product-list");
  const productElement = document.getElementById(`product-${productId}`);
  if (productElement) {
    productList.removeChild(productElement);
  }
});

// Envio de productos al crear un nuevo producto
document.getElementById("product-form").addEventListener("submit", event => {
  event.preventDefault();

  // Datos del producto
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  // Emitir evento al servidor
  socket.emit("addProduct", { title, price, description });

  // Resetear formulario
  document.getElementById("product-form").reset();
});
