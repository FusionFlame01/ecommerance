"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  links?: NavLink[];
}

const defaultLinks: NavLink[] = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kids" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ links = defaultLinks }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <header className="sticky top-0 z-50 bg-light-100">
      <nav
        aria-label="Primary"
        className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:grid lg:h-20 lg:grid-cols-[1fr_auto_1fr] lg:px-12"
      >
        <Link href="/" aria-label="Nike home" className="flex w-fit items-center">
          <Image src="/logo.svg" alt="Nike" width={36} height={13} priority className="invert" />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-body-medium text-dark-900 transition-colors hover:text-dark-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 justify-self-end lg:flex">
          <button
            type="button"
            className="text-body-medium text-dark-900 transition-colors hover:text-dark-700"
          >
            Search
          </button>
          <Link
            href="/cart"
            className="text-body-medium text-dark-900 transition-colors hover:text-dark-700"
          >
            My Cart ({cartCount})
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((prev) => !prev)}
          className="relative flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <span
            aria-hidden="true"
            className={`absolute h-0.5 w-6 bg-dark-900 transition-transform duration-200 ${open ? "rotate-45" : "-translate-y-2"}`}
          />
          <span
            aria-hidden="true"
            className={`absolute h-0.5 w-6 bg-dark-900 transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            aria-hidden="true"
            className={`absolute h-0.5 w-6 bg-dark-900 transition-transform duration-200 ${open ? "-rotate-45" : "translate-y-2"}`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-light-300 bg-light-100 lg:hidden"
      >
        <ul className="space-y-1 px-4 py-4 sm:px-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-lead text-dark-900 hover:text-dark-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6 border-t border-light-300 px-4 py-4 sm:px-6">
          <button type="button" className="text-body-medium text-dark-900 hover:text-dark-700">
            Search
          </button>
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="text-body-medium text-dark-900 hover:text-dark-700"
          >
            My Cart ({cartCount})
          </Link>
        </div>
      </div>
    </header>
  );
}
