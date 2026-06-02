import Link from "next/link";

const links = [
  { href: "/designers", label: "Browse Designers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-stone-900 tracking-tight text-sm cursor-pointer"
        >
          Hire Ethiopia&apos;s Best
        </Link>

        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-stone-500 hover:text-stone-900 transition-colors duration-150 cursor-pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/apply"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-700 transition-colors duration-150 cursor-pointer"
            >
              Apply as Designer
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
