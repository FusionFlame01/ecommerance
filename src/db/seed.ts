import { config } from "dotenv";
import type { NewProduct } from "./schema";

config({ path: [".env.local", ".env"] });

const sampleProducts = [
  {
    name: "Nike Air Force 1 '07 LV8",
    description:
      "The radiance lives on in the b-ball original. Crisp leather, bold details and the perfect amount of flash make the Air Force 1 an everyday icon.",
    price: "120.00",
    imageUrl: "/shoes/shoe-3.webp",
    brand: "Nike",
    category: "Lifestyle",
    subtitle: "Men's Shoes",
    colorCount: 6,
    badge: "Best Seller",
    badgeTone: "red",
  },
  {
    name: "Nike Air Max Plus",
    description:
      "Let your attitude have the edge in the Air Max Plus, a Tuned Air experience that offers premium stability and unbelievable cushioning.",
    price: "180.00",
    imageUrl: "/shoes/shoe-4.webp",
    brand: "Nike",
    category: "Lifestyle",
    subtitle: "Men's Shoes",
    colorCount: 4,
    badge: "Extra 20% off",
    badgeTone: "green",
  },
  {
    name: "Nike Air Max Dn",
    description:
      "Dynamic Air unit system with dual-pressure tubes creates a reactive sensation with every step, for a futuristic design that's comfortable enough to wear all day.",
    price: "160.00",
    imageUrl: "/shoes/shoe-6.avif",
    brand: "Nike",
    category: "Lifestyle",
    subtitle: "Men's Shoes",
    colorCount: 3,
    badge: "Sustainable Materials",
    badgeTone: "green",
  },
  {
    name: "Nike Air Max Dn SE",
    description:
      "The Air Max Dn SE pairs our next-gen Dynamic Air cushioning with special-edition details for a look that stands out on the street.",
    price: "170.00",
    imageUrl: "/shoes/shoe-7.avif",
    brand: "Nike",
    category: "Lifestyle",
    subtitle: "Men's Shoes",
    colorCount: 1,
  },
  {
    name: "Nike Pegasus 41",
    description:
      "Responsive cushioning in the Pegasus provides an energized ride for everyday road running. ReactX foam and Air Zoom units deliver a springy feel mile after mile.",
    price: "140.00",
    imageUrl: "/shoes/shoe-8.avif",
    brand: "Nike",
    category: "Running",
    subtitle: "Men's Road Running Shoes",
    colorCount: 8,
    badge: "Best Seller",
    badgeTone: "red",
  },
  {
    name: "Sabrina 2",
    description:
      "Sabrina Ionescu's game is all about precision. Her second signature shoe keeps you low to the court with responsive cushioning for quick cuts and pull-ups.",
    price: "130.00",
    imageUrl: "/shoes/shoe-9.avif",
    brand: "Nike",
    category: "Basketball",
    subtitle: "Basketball Shoes",
    colorCount: 5,
    badge: "Extra 10% off",
    badgeTone: "green",
  },
  {
    name: "Nike G.T. Cut 3",
    description:
      "Designed to help you create space for stepback jumpers and backdoor cuts, the G.T. Cut 3 delivers explosive energy return in a low-to-the-ground package.",
    price: "170.00",
    imageUrl: "/shoes/shoe-10.avif",
    brand: "Nike",
    category: "Basketball",
    subtitle: "Basketball Shoes",
    colorCount: 4,
  },
  {
    name: "Nike Free Metcon 6",
    description:
      "Flexible forefoot meets stable heel. The Free Metcon 6 is built to move with you through sprints, lifts and everything in between.",
    price: "120.00",
    imageUrl: "/shoes/shoe-11.avif",
    brand: "Nike",
    category: "Training",
    subtitle: "Women's Workout Shoes",
    colorCount: 6,
    badge: "Best Seller",
    badgeTone: "red",
  },
  {
    name: "Nike Motiva",
    description:
      "A rocker-shaped sole and super-soft foam help you roll through each step, making the Motiva a comfortable companion for walks of any length.",
    price: "115.00",
    imageUrl: "/shoes/shoe-12.avif",
    brand: "Nike",
    category: "Walking",
    subtitle: "Women's Walking Shoes",
    colorCount: 3,
    badge: "Sustainable Materials",
    badgeTone: "green",
  },
  {
    name: "Nike Field General",
    description:
      "Born on the gridiron in the '80s and back for the streets, the Field General brings soft suede and a grippy gum-style outsole to your everyday rotation.",
    price: "100.00",
    imageUrl: "/shoes/shoe-13.avif",
    brand: "Nike",
    category: "Lifestyle",
    subtitle: "Men's Shoes",
    colorCount: 2,
  },
  {
    name: "Nike Zegama 2",
    description:
      "Made for steep climbs and technical descents, the Zegama 2 pairs plush ZoomX foam with a lugged outsole for confident footing on the trail.",
    price: "180.00",
    imageUrl: "/shoes/shoe-14.avif",
    brand: "Nike",
    category: "Running",
    subtitle: "Women's Trail Running Shoes",
    colorCount: 4,
    badge: "Extra 20% off",
    badgeTone: "green",
  },
  {
    name: "Nike Vomero 18",
    description:
      "Our most cushioned Vomero yet. A stacked ZoomX and ReactX midsole delivers a soft, smooth ride for your longest runs.",
    price: "150.00",
    imageUrl: "/shoes/shoe-15.avif",
    brand: "Nike",
    category: "Running",
    subtitle: "Men's Road Running Shoes",
    colorCount: 5,
  },
] satisfies NewProduct[];

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
