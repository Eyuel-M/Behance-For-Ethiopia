export default function DesignersPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Browse Designers
        </h1>
        <p className="mt-2 text-gray-500">
          Vetted Ethiopian designers ready to work with your business.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <p className="text-sm text-gray-400 col-span-full">
          Designer cards will appear here.
        </p>
      </div>
    </section>
  );
}
