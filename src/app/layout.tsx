import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nike",
  description: "An ecommerce site for Nike products",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-light-100 font-jost text-dark-900">
        {children}
      </body>
    </html>
  );
}
