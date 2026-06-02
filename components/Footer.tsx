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
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="font-semibold text-gray-900 text-sm">
            Hire Ethiopia&apos;s Best
          </span>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed max-w-xs">
            Connecting businesses with vetted Ethiopian designers since 2024.
          </p>
        </div>
        {Object.entries(links).map(([group, items]) => (
          <div key={group}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {group}
            </p>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 py-5 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Hire Ethiopia&apos;s Best Designers. All rights reserved.
      </div>
    </footer>
  );
}
