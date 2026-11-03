# Ecommerce

A Next.js (App Router) storefront built with TypeScript, Tailwind CSS, Drizzle ORM on Neon PostgreSQL, Better Auth, and Zustand.

## Tech stack

- **Next.js** (App Router, `src/` directory) + **TypeScript** + **ESLint**
- **Tailwind CSS**
- **Drizzle ORM** + **drizzle-kit** with the **Neon serverless** driver (`@neondatabase/serverless`)
- **Better Auth** (email/password, Drizzle adapter)
- **Zustand** for client state (cart store)

## Project structure

```
src/
  app/
    api/auth/[...all]/route.ts  # Better Auth route handler
    page.tsx                    # Homepage: product grid (server component)
  db/
    index.ts                    # Drizzle client (Neon HTTP driver)
    schema.ts                   # products + Better Auth tables
    seed.ts                     # Sample Nike products
  lib/auth.ts                   # Better Auth config
  store/cart.ts                 # Zustand cart store
drizzle.config.ts               # drizzle-kit config
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env.local
```

| Variable             | Description                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`       | Neon PostgreSQL connection string (from the [Neon console](https://console.neon.tech) → Connect). |
| `BETTER_AUTH_SECRET` | Random secret, at least 32 characters. Generate with `openssl rand -base64 32`.                   |
| `BETTER_AUTH_URL`    | Base URL of the app, e.g. `http://localhost:3000`.                                                |

`.env*` files are git-ignored (except `.env.example`), so never commit real secrets.

### 3. Create the database tables

Push the schema directly to your database:

```bash
npx drizzle-kit push        # or: npm run db:push
```

Or, if you prefer versioned SQL migrations:

```bash
npx drizzle-kit generate    # or: npm run db:generate
npx drizzle-kit migrate     # or: npm run db:migrate
```

### 4. Seed sample products

```bash
npm run seed
```

This replaces the contents of the `products` table with six sample Nike products.

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the product grid.

## Scripts

| Script                | Description                       |
| --------------------- | --------------------------------- |
| `npm run dev`         | Start the development server      |
| `npm run build`       | Production build                  |
| `npm run start`       | Start the production server       |
| `npm run lint`        | Run ESLint                        |
| `npm run seed`        | Seed the database with products   |
| `npm run db:push`     | Push the schema to the database   |
| `npm run db:generate` | Generate SQL migrations           |
| `npm run db:migrate`  | Apply SQL migrations              |
| `npm run db:studio`   | Open Drizzle Studio               |
