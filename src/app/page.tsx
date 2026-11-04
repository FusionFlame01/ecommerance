import { connection } from "next/server";
import Card from "@/components/Card";
import { db } from "@/db";
import { products, type Product } from "@/db/schema";

export default async function Home() {
  await connection();

  let items: Product[] = [];
  let error: string | null = null;
  try {
    items = await db.select().from(products);
  } catch (err) {
    console.error("Failed to load products:", err);
    error = "We couldn't load products right now. Please try again later.";
  }

  const latestShoes = [
    {
      id: 1,
      name: "Air Max Runner",
      category: "Running",
      brand: "Nike",
      price: 149.99,
      imageUrl: "/shoes/shoe-1.jpg",
    },
    {
      id: 2,
      name: "Classic Leather",
      category: "Casual",
      brand: "Adidas",
      price: 89.99,
      imageUrl: "/shoes/shoe-2.webp",
    },
    {
      id: 3,
      name: "Ultra Boost",
      category: "Running",
      brand: "Adidas",
      price: 179.99,
      imageUrl: "/shoes/shoe-3.webp",
    },
    {
      id: 4,
      name: "Dunk Low",
      category: "Lifestyle",
      brand: "Nike",
      price: 109.99,
      imageUrl: "/shoes/shoe-4.webp",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-heading-3 text-dark-900">Shop Sneakers</h1>
        <p className="mt-2 text-body text-dark-700">
          {items.length > 0
            ? `${items.length} product${items.length === 1 ? "" : "s"}`
            : "Browse our latest collection"}
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-6 text-heading-2 text-dark-900">Latest Shoes</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {latestShoes.map((shoe) => (
            <Card
              key={shoe.id}
              title={shoe.name}
              description={shoe.category}
              meta={shoe.brand}
              imageSrc={shoe.imageUrl}
              price={shoe.price}
            />
          ))}
        </div>
      </section>

      {error ? (
        <EmptyState title="Something went wrong" message={error} />
      ) : items.length === 0 ? (
        <EmptyState
          title="No products yet"
          message="Run `npm run seed` to add some sample products."
        />
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <li key={product.id}>
              <Card
                title={product.name}
                description={product.category}
                meta={product.brand}
                imageSrc={product.imageUrl}
                price={product.price}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-light-400 px-6 py-16 text-center">
      <h2 className="text-lead text-dark-900">{title}</h2>
      <p className="mt-2 text-body text-dark-700">{message}</p>
    </div>
  );
}
