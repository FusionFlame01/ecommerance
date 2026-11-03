import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

const sampleProducts = [
  {
    name: "Nike Air Force 1 '07",
    description:
      "The radiance lives on in the b-ball original. Crisp leather, bold details and the perfect amount of flash make the Air Force 1 '07 an everyday icon.",
    price: "110.00",
    imageUrl: "https://placehold.co/600x600/png?text=Air+Force+1",
    brand: "Nike",
    category: "Lifestyle",
  },
  {
    name: "Nike Air Max 90",
    description:
      "Nothing as fly, nothing as comfortable, nothing as proven. The Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and visible Max Air cushioning.",
    price: "130.00",
    imageUrl: "https://placehold.co/600x600/png?text=Air+Max+90",
    brand: "Nike",
    category: "Lifestyle",
  },
  {
    name: "Nike Dunk Low Retro",
    description:
      "Created for the hardwood but taken to the streets, this '80s basketball icon returns with classic details and throwback hoops flair. Padded, low-cut collar for all-day comfort.",
    price: "115.00",
    imageUrl: "https://placehold.co/600x600/png?text=Dunk+Low",
    brand: "Nike",
    category: "Lifestyle",
  },
  {
    name: "Nike Pegasus 41",
    description:
      "Responsive cushioning in the Pegasus provides an energized ride for everyday road running. ReactX foam and Air Zoom units deliver a springy feel mile after mile.",
    price: "140.00",
    imageUrl: "https://placehold.co/600x600/png?text=Pegasus+41",
    brand: "Nike",
    category: "Running",
  },
  {
    name: "Air Jordan 1 Retro High OG",
    description:
      "Familiar but always fresh, the iconic Air Jordan 1 is remastered with premium leather, classic colour blocking and the original Wings logo on the collar.",
    price: "180.00",
    imageUrl: "https://placehold.co/600x600/png?text=Jordan+1",
    brand: "Jordan",
    category: "Basketball",
  },
  {
    name: "Nike Blazer Mid '77 Vintage",
    description:
      "Styled for the '70s, loved in the '80s, classic in the '90s and ready for the future. Vintage treatment on the midsole and an exposed foam tongue give it that broken-in look.",
    price: "105.00",
    imageUrl: "https://placehold.co/600x600/png?text=Blazer+Mid",
    brand: "Nike",
    category: "Lifestyle",
  },
];

async function main() {
  const { db } = await import("./index");
  const { products } = await import("./schema");

  console.log("Seeding products...");
  await db.delete(products);
  const inserted = await db
    .insert(products)
    .values(sampleProducts)
    .returning({ id: products.id, name: products.name });
  console.log(`Inserted ${inserted.length} products:`);
  for (const p of inserted) console.log(`  - ${p.name}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
