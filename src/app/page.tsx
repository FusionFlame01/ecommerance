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
