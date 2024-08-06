const socket = io();

///////////////////////// Add Product /////////////////////////

// Al agregar un producto
socket.on("productAdded", product => {
  const productList = document.getElementById("product-list");

  // Crear un nuevo elemento de producto
  const productCard = document.createElement("div");
  productCard.className = "bg-white shadow-md rounded-lg overflow-hidden";

  productCard.innerHTML = `
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">${product.title}</h2>
      <p class="text-gray-600 mb-2"><span class="font-semibold">ID:</span> ${product.id}</p>
      <p class="text-gray-600 mb-4">${product.description}</p>
      <p class="text-gray-800 font-bold mb-2">$${product.price}</p>
      <p class="text-gray-600 mb-2"><span class="font-semibold">Categoría:</span> ${product.category}</p>
      <p class="text-gray-600 mb-2"><span class="font-semibold">Stock:</span> ${product.stock}</p>
      <p class="text-gray-600 mb-2"><span class="font-semibold">Estado:</span> ${product.status ? "Disponible" : "No disponible"}</p>
    </div>
  `;

  // Agregar el producto al DOM
  productList.appendChild(productCard);
});

// Accion del formulario de agregar producto
document.getElementById("product-form").addEventListener("submit", event => {
  event.preventDefault();

  // Atributos del producto a agregar
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const stock = document.getElementById("stock").value;
  const status = document.getElementById("status").value;

  // Emitir evento al servidor
  socket.emit("addProduct", { title, price, description, category, stock, status });

  // Resetear formulario
  document.getElementById("product-form").reset();
});

///////////////////////// Remove Product /////////////////////////

// Al eliminar un producto por ID
socket.on("productRemoved", function (removedProductId) {
  // Remove the product from the DOM
  const productElement = document.getElementById(removedProductId);
  if (productElement) {
    productElement.remove();
  }
});

// Accion del formulario de eliminar producto
document.getElementById("remove-product-form").addEventListener("submit", event => {
  event.preventDefault();

  // ID del producto a eliminar
  const productId = document.getElementById("productId").value;

  // Emitir evento al servidor
  socket.emit("removeProduct", productId);

  // Resetear formulario
  document.getElementById("remove-product-form").reset();
});
