import Image from "next/image";
import Link from "next/link";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface FooterProps {
  columns?: FooterColumn[];
  socials?: SocialLink[];
  legalLinks?: FooterLink[];
  location?: string;
  copyright?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    title: "Featured",
    links: [
      { label: "Air Force 1", href: "#" },
      { label: "Huarache", href: "#" },
      { label: "Air Max 90", href: "#" },
      { label: "Air Max 95", href: "#" },
    ],
  },
  {
    title: "Shoes",
    links: [
      { label: "All Shoes", href: "#" },
      { label: "Custom Shoes", href: "#" },
      { label: "Jordan Shoes", href: "#" },
      { label: "Running Shoes", href: "#" },
    ],
  },
  {
    title: "Clothing",
    links: [
      { label: "All Clothing", href: "#" },
      { label: "Modest Wear", href: "#" },
      { label: "Hoodies & Pullovers", href: "#" },
      { label: "Shirts & Tops", href: "#" },
    ],
  },
  {
    title: "Kids'",
    links: [
      { label: "Infant & Toddler Shoes", href: "#" },
      { label: "Kids' Shoes", href: "#" },
      { label: "Kids' Jordan Shoes", href: "#" },
      { label: "Kids' Basketball Shoes", href: "#" },
    ],
  },
];

const defaultSocials: SocialLink[] = [
  { label: "X", href: "#", icon: "/x.svg" },
  { label: "Facebook", href: "#", icon: "/facebook.svg" },
  { label: "Instagram", href: "#", icon: "/instagram.svg" },
];

const defaultLegalLinks: FooterLink[] = [
  { label: "Guides", href: "#" },
  { label: "Terms of Sale", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Nike Privacy Policy", href: "#" },
];

export default function Footer({
  columns = defaultColumns,
  socials = defaultSocials,
  legalLinks = defaultLegalLinks,
  location = "Croatia",
  copyright = "© 2025 Nike, Inc. All Rights Reserved",
}: FooterProps) {
  return (
    <footer className="bg-dark-900 text-light-100">
      <div className="w-full px-4 pt-12 sm:px-6 lg:px-12 lg:pt-16">
        <div className="flex flex-col gap-10 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-start">
          <Link href="/" aria-label="Nike home" className="w-fit shrink-0">
            <Image src="/logo.svg" alt="Nike" width={80} height={29} />
          </Link>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:gap-x-8 xl:grid-cols-[repeat(4,13rem)] xl:gap-x-0 2xl:grid-cols-[repeat(4,14rem)]"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-body-medium text-light-100 xl:text-lead">{column.title}</h2>
                <ul className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-body text-dark-500 transition-colors hover:text-light-100 xl:text-lead xl:font-normal"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <ul className="flex items-center gap-4 xl:justify-self-end" aria-label="Social media">
            {socials.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-light-100 transition-opacity hover:opacity-80"
                >
                  <Image src={social.icon} alt="" width={18} height={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-dark-700/40 py-6 text-caption sm:mt-16 lg:flex-row lg:items-center lg:justify-between lg:border-t-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-dark-500">
            <span className="flex items-center gap-1.5 text-light-100">
              <Image src="/location.svg" alt="" width={12} height={16} />
              {location}
            </span>
            <span className="font-normal">{copyright}</span>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-normal text-dark-500 transition-colors hover:text-light-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
