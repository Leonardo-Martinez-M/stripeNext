export async function buyProduct(productId: string) {
  const res = await fetch("http://localhost:3000/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error("Error al procesar compra");
  return res.json();
}

export async function checkSession() {
  const res = await fetch("http://localhost:3000/checksession", {
    method: "GET",
    credentials: "include", // Si manejas cookies
  });
  return res.json();
}
