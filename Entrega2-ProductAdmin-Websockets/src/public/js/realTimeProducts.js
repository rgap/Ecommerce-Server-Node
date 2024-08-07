const socket = io();

///////////////////////// Agregar Producto /////////////////////////

// Escuchar el evento "productAdded" del servidor
socket.on("productAdded", product => {
  const productList = document.getElementById("product-list");

  // Crear un nuevo elemento de tarjeta de producto
  const productCard = document.createElement("div");
  productCard.className = "bg-white shadow-md rounded-lg overflow-hidden";
  productCard.id = product.id; // Asignar el ID del producto

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

  // Agregar la nueva tarjeta de producto al DOM
  productList.appendChild(productCard);
});

///////////////////////// Eliminar Producto /////////////////////////

// Escuchar el evento "productRemoved" del servidor
socket.on("productRemoved", removedProductId => {
  // Encontrar el elemento del producto por ID y eliminarlo del DOM
  const productElement = document.getElementById(removedProductId);
  if (productElement) {
    productElement.remove();
  }
});

///////////////////////// Acciones de Formulario /////////////////////////

// Formulario para agregar un producto
document.getElementById("product-form").addEventListener("submit", event => {
  event.preventDefault();

  // Recopilar los detalles del producto desde el formulario
  const title = document.getElementById("title").value;
  const price = parseFloat(document.getElementById("price").value);
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const stock = parseInt(document.getElementById("stock").value, 10);
  const status = document.getElementById("status").value === "true";

  // Enviar los datos del producto al servidor usando una solicitud HTTP
  fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, price, description, category, stock, status }),
  })
    .then(response => response.json())
    .then(data => {
      if (data) {
        console.log("Producto agregado exitosamente:", data);
      }
    })
    .catch(error => console.error("Error al agregar el producto:", error));

  // Resetear el formulario
  document.getElementById("product-form").reset();
});

// Formulario para eliminar un producto
document.getElementById("remove-product-form").addEventListener("submit", event => {
  event.preventDefault();

  // Obtener el ID del producto a eliminar
  const productId = document.getElementById("productId").value;

  // Enviar la solicitud de eliminación al servidor usando una solicitud HTTP
  fetch(`/api/products/${productId}`, {
    method: "DELETE",
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Product deleted") {
        console.log("Producto eliminado exitosamente");
      }
    })
    .catch(error => console.error("Error al eliminar el producto:", error));

  // Resetear el formulario
  document.getElementById("remove-product-form").reset();
});
