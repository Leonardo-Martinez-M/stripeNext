export async function getProducts() {
  const res = await fetch("http://localhost:3000/products", {
    cache: "no-store", // Para no usar cache del server
  });
  if (!res.ok) throw new Error("Error obteniendo productos");
  return res.json();
}
