import Link from "next/link";

export default function HomePage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-6">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900">
        Hire Ethiopia&apos;s Best Designers
      </h1>
      <p className="max-w-xl text-lg text-gray-500">
        Connect your business with vetted Ethiopian designers who deliver
        world-class creative work.
      </p>
      <div className="flex gap-4 mt-2">
        <Link
          href="/designers"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Browse Designers
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
