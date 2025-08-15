"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/productsCard";
import { getProducts } from "../../services/productsService";
import { buyProduct, checkSession } from "../../services/checkoutService";
import { useRouter } from "next/navigation";


function HomePage() {
  const router = useRouter();
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buying, setBuying] = useState(false);

  // GET productos al cargar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProductos(data);
      } catch (err) {
        setError("Hubo un error cargando los productos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // POST compra
  const handleBuy = async (id: string) => {
    try {
      setBuying(true);
      const session = await checkSession();
      if (!session.isValid) {
        router.push("/login");
        return;
      }
      await buyProduct(id);
      router.push("/success");
    } catch (err) {
      router.push("/error");
    } finally {
      setBuying(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {productos.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          price={p.price}
          image={p.image || "/placeholder.png"}
          onBuy={handleBuy}
        />
      ))}
    </div>
  );
} 

export default HomePage