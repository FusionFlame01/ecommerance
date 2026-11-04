import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col lg:grid lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-dark-900 p-12 text-light-100 lg:flex xl:p-16">
        <Link
          href="/"
          aria-label="Nike home"
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange transition-opacity hover:opacity-90"
        >
          <Image src="/logo.svg" alt="" width={32} height={12} priority />
        </Link>

        <div className="max-w-lg">
          <h2 className="text-heading-2">Just Do It</h2>
          <p className="mt-4 text-lead font-normal text-dark-500">
            Join millions of athletes and fitness enthusiasts who trust Nike for their
            performance needs.
          </p>
          <div aria-hidden="true" className="mt-8 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-light-100" />
            <span className="h-2 w-2 rounded-full bg-dark-700" />
            <span className="h-2 w-2 rounded-full bg-dark-700" />
          </div>
        </div>

        <p className="text-footnote text-dark-700">
          &copy; 2025 Nike, Inc. All Rights Reserved
        </p>
      </aside>

      <main className="flex flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12 lg:px-12">
        <Link
          href="/"
          aria-label="Nike home"
          className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-dark-900 lg:hidden"
        >
          <Image src="/logo.svg" alt="" width={28} height={10} priority />
        </Link>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
