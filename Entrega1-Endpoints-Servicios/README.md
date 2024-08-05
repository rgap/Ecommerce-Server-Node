# Coderhouse - Rel Guzman

## Descripción

Una API de pruebas que permite gestionar productos y carritos de compras

## Rutas Existentes

### Productos

1. **Listar todos los productos**

   - **Método**: `GET`
   - **URL**: `http://localhost:8080/api/products`
   - **Parámetros de consulta**: `?limit=<number>` (opcional)
   - **Descripción**: Lista todos los productos, con opción de limitar el número de resultados.

2. **Obtener un producto por ID**

   - **Método**: `GET`
   - **URL**: `http://localhost:8080/api/products/:pid`
   - **Parámetros de ruta**: `:pid` (ID del producto)
   - **Descripción**: Obtiene los detalles de un producto específico por su ID.

3. **Agregar un nuevo producto**

   - **Método**: `POST`
   - **URL**: `http://localhost:8080/api/products`
   - **Cuerpo de la solicitud (JSON)**:
     ```json
     {
       "title": "Llave Inglesa Ajustable",
       "description": "Llave inglesa ajustable de acero forjado con mango antideslizante, ideal para trabajos de fontanería.",
       "code": "LLV1",
       "price": 15.49,
       "status": true,
       "stock": 75,
       "category": "Herramientas Manuales",
       "thumbnails": ["images/llave_inglesa_1.jpg", "images/llave_inglesa_2.jpg"]
     }
     ```
   - **Descripción**: Agrega un nuevo producto.

4. **Actualizar un producto**

   - **Método**: `PUT`
   - **URL**: `http://localhost:8080/api/products/:pid`
   - **Parámetros de ruta**: `:pid` (ID del producto)
   - **Cuerpo de la solicitud (JSON)**:
     ```json
     {
       "title": "Taladro Eléctrico",
       "description": "Taladro eléctrico de 500W con velocidad variable y reversa.",
       "price": 45.99,
       "stock": 30
     }
     ```
   - **Descripción**: Actualiza un producto existente.

5. **Eliminar un producto**
   - **Método**: `DELETE`
   - **URL**: `http://localhost:8080/api/products/:pid`
   - **Parámetros de ruta**: `:pid` (ID del producto)
   - **Descripción**: Elimina un producto específico por su ID.

### Carritos

1. **Crear un nuevo carrito**

   - **Método**: `POST`
   - **URL**: `http://localhost:8080/api/carts`
   - **Descripción**: Crea un nuevo carrito.

2. **Obtener todos los carritos**

   - **Método**: `GET`
   - **URL**: `http://localhost:8080/api/carts`
   - **Descripción**: Lista todos los carritos.

3. **Obtener un carrito por ID**

   - **Método**: `GET`
   - **URL**: `http://localhost:8080/api/carts/:cid`
   - **Parámetros de ruta**: `:cid` (ID del carrito)
   - **Descripción**: Obtiene los detalles de un carrito específico por su ID.

4. **Agregar un producto a un carrito**
   - **Método**: `POST`
   - **URL**: `http://localhost:8080/api/carts/:cid/product/:pid`
   - **Parámetros de ruta**: `:cid` (ID del carrito), `:pid` (ID del producto)
   - **Descripción**: Agrega un producto al carrito específico por su ID.
