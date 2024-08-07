# Coderhouse - Rel Guzman

## Páginas Existentes

### Página de Inicio

http://localhost:8080/

Contiene la lista de productos.

## Página de Productos en Tiempo Real

http://localhost:8080/realtimeproducts

Muestra una vista en vivo de los productos, permitiendo actualizaciones en tiempo real mediante WebSockets.

Posibles acciones mediante formularios:

- Agregar Productos
- Eliminar Productos

## Depedencias Relevantes

- Socket.io: Para comunicación bidireccional en tiempo real entre cliente y servidor.
- Express: Framework del servidor backend.
- Handlebars: Motor de plantillas para renderizar contenido dinámico.

## Notas Adicionales

Esta solución actualmente está limitada por el uso de un archivo JSON (data/products.json) desde el cual se realizan operaciones de lectura y escritura.

Las bases de datos proporcionan mejor acceso concurrente.
