import Image from "next/image";
import { connection } from "next/server";
import { db } from "@/db";
import { products, type Product } from "@/db/schema";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
        <h1 className="text-3xl font-bold tracking-tight">Shop Sneakers</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
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
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {product.brand}
        </p>
        <h2 className="font-semibold leading-snug">{product.name}</h2>
        <p className="mt-auto pt-2 text-lg font-semibold">
          {priceFormatter.format(Number(product.price))}
        </p>
      </div>
    </article>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{message}</p>
    </div>
  );
}
