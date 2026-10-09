import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center text-black text-xs font-extrabold select-none">H</span>
              <span className="font-extrabold text-white text-sm">Hire Ethiopia&apos;s Best</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              A curated talent network matching Ethiopian businesses with vetted
              creative and digital professionals.
            </p>
          </div>

          {/* For businesses */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">For Businesses</p>
            <ul className="space-y-2.5">
              {[
                { label: "Submit a Brief", href: "/get-started/client" },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Our Services", href: "/#services" },
                { label: "Contact Us", href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For professionals */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">For Professionals</p>
            <ul className="space-y-2.5">
              {[
                { label: "Apply to the Network", href: "/get-started/designer" },
                { label: "How Vetting Works", href: "/#how-it-works" },
                { label: "Contact Us", href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Hire Ethiopia&apos;s Best. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700">
            Ethiopia-first · Curated, not crowdsourced
          </p>
        </div>
      </div>
    </footer>
  );
}
