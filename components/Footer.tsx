import Link from "next/link";

const links = {
  Platform: [
    { label: "Browse Designers", href: "/designers" },
    { label: "Categories", href: "/designers" },
    { label: "How It Works", href: "/#how-it-works" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Designers: [
    { label: "Apply to Join", href: "/apply" },
    { label: "Designer FAQ", href: "/faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="font-extrabold text-white text-sm">
            Hire Ethiopia&apos;s Best
          </span>
          <p className="mt-2 text-sm text-zinc-500 leading-relaxed max-w-xs">
            Connecting businesses with vetted Ethiopian designers since 2024.
          </p>
        </div>
        {Object.entries(links).map(([group, items]) => (
          <div key={group}>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
              {group}
            </p>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-800 py-5 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Hire Ethiopia&apos;s Best Designers. All rights reserved.
      </div>
    </footer>
  );
}
