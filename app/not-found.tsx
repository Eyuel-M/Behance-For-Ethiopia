import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#071208" }}>

      {/* Minimal top bar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-5xl mx-auto px-5 py-4">
          <Link href="/" className="text-sm font-black" style={{ color: "#6dcc46" }}>
            Hire Ethiopia&apos;s Best
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-20 text-center">
        <p
          className="font-black leading-none mb-6 select-none"
          style={{ fontSize: "clamp(80px, 20vw, 180px)", color: "rgba(109,204,70,0.12)", fontFamily: "var(--font-display), sans-serif" }}
          aria-hidden="true"
        >
          404
        </p>

        <div className="relative -mt-16 sm:-mt-20 mb-8">
          <div className="flex items-center gap-2 justify-center mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">Page not found</p>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Nothing here.
          </h1>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed mx-auto">
            The page you&apos;re looking for doesn&apos;t exist, may have moved, or the link might be wrong.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors"
            style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
          >
            Back to homepage →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors"
            style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
