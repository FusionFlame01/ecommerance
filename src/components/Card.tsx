import Image from "next/image";
import Link from "next/link";

type BadgeTone = "red" | "green" | "orange";

export interface CardBadge {
  label: string;
  tone?: BadgeTone;
}

export interface CardProps {
  title: string;
  imageSrc: string;
  imageAlt?: string;
  description?: string;
  meta?: string | string[];
  price?: number | string;
  badge?: CardBadge;
  href?: string;
  currency?: string;
  className?: string;
}

const badgeToneClasses: Record<BadgeTone, string> = {
  red: "text-red",
  green: "text-green",
  orange: "text-orange",
};

function formatPrice(price: number | string, currency: string) {
  const value = typeof price === "string" ? Number(price) : price;
  if (Number.isNaN(value)) return String(price);
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);
}

export default function Card({
  title,
  imageSrc,
  imageAlt,
  description,
  meta,
  price,
  badge,
  href,
  currency = "USD",
  className = "",
}: CardProps) {
  const metaItems = meta === undefined ? [] : Array.isArray(meta) ? meta : [meta];

  const content = (
    <article
      className={`group flex h-full flex-col overflow-hidden bg-light-100 ${className}`}
    >
      <div className="relative aspect-square overflow-hidden bg-light-200">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge && (
          <span
            className={`absolute left-3 top-3 rounded-full bg-light-100 px-3 py-1 text-caption sm:left-4 sm:top-4 sm:px-4 sm:py-1.5 sm:text-body-medium ${badgeToneClasses[badge.tone ?? "red"]}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 py-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-body-medium text-dark-900 sm:text-lead">{title}</h3>
          {price !== undefined && (
            <p className="shrink-0 text-body-medium text-dark-900 sm:text-lead">
              {formatPrice(price, currency)}
            </p>
          )}
        </div>
        {description && (
          <p className="text-body text-dark-700 sm:text-lead sm:font-normal">{description}</p>
        )}
        {metaItems.map((item) => (
          <p key={item} className="text-body text-dark-700 sm:text-lead sm:font-normal">
            {item}
          </p>
        ))}
      </div>
    </article>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label={title}
      className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-900"
    >
      {content}
    </Link>
  );
}
