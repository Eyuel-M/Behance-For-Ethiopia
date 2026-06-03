import Link from "next/link";

const links = [
  { href: "/designers", label: "Browse Designers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-100 bg-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-extrabold text-zinc-900 tracking-tight text-base cursor-pointer"
        >
          Hire Ethiopia&apos;s Best
        </Link>

        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150 cursor-pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/apply"
              className="text-sm font-semibold px-5 py-2 rounded-full bg-green-500 text-black hover:bg-green-400 transition-colors duration-150 cursor-pointer"
            >
              Apply as Designer
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
