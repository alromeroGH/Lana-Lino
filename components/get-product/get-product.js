export async function getProduct(id) {
    try {
        const response = await fetch(`http://localhost:4000/api/obtenerDatosProducto/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        // console.log("Producto:", data.payload[0]);
        return data.payload[0];
      } catch (error) {
        console.error("Error al mostrar favoritos:", error);
      }
}