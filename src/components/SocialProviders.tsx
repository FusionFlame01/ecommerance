import Image from "next/image";

export type SocialProvider = "google" | "apple";

const providers: { id: SocialProvider; label: string; icon: string }[] = [
  { id: "google", label: "Google", icon: "/google.svg" },
  { id: "apple", label: "Apple", icon: "/apple.svg" },
];

export interface SocialProvidersProps {
  onSelect?: (provider: SocialProvider) => void;
  disabled?: boolean;
}

export default function SocialProviders({ onSelect, disabled }: SocialProvidersProps) {
  return (
    <div className="flex flex-col gap-3">
      {providers.map((provider) => (
        <button
          key={provider.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect?.(provider.id)}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-light-300 bg-light-100 text-body-medium text-dark-900 transition-colors hover:bg-light-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Image src={provider.icon} alt="" width={20} height={20} />
          Continue with {provider.label}
        </button>
      ))}
    </div>
  );
}
