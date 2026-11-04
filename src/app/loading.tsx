export default function Loading() {
  return (
    <main className="w-full flex-1 px-4 pt-6 pb-16 sm:px-6 lg:px-12 lg:pt-8">
      <div className="mb-6 h-8 w-32 animate-pulse rounded bg-light-200 lg:mb-8" />
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-square animate-pulse bg-light-200" />
            <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-light-200" />
            <div className="mt-2 h-5 w-1/2 animate-pulse rounded bg-light-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
