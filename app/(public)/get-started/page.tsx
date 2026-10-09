import Link from "next/link";

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const CLIENT_PERKS = [
  "Submit your brief in under 5 minutes",
  "Our team qualifies every brief — no auto-matching",
  "Choose Direct Match or Managed Project delivery",
  "Curated shortlist, not a feed of hundreds",
  "We respond within 48 hours",
];

const PRO_PERKS = [
  "Free to apply — no joining fees",
  "Matched to vetted Ethiopian businesses",
  "You set your own rates and availability",
  "Portfolio and identity reviewed — quality protected",
  "Managed Project option means less client management",
];

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
            Get started
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            How would you like to work with us?
          </h1>
          <p className="mt-4 text-zinc-500 text-base max-w-xl mx-auto leading-relaxed">
            Tell us what you need and we&apos;ll match you with the right professional — or
            if you are one, apply to join the network.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Business card */}
          <Link
            href="/get-started/client"
            className="group flex flex-col rounded-3xl border-2 border-zinc-200 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="p-8 flex-1">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-black font-extrabold text-lg mb-6 group-hover:scale-105 transition-transform duration-200">
                B
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2">I need work done</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Submit your project brief. We&apos;ll qualify it, match you with vetted
                professionals, and support delivery your way.
              </p>
              <ul className="space-y-2.5">
                {CLIENT_PERKS.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <polyline points="2 6 5 9 10 3" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-8 py-5 border-t border-zinc-700 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Submit a brief</span>
              <span className="text-zinc-400 group-hover:translate-x-1 transition-transform duration-150">
                <ArrowRightIcon />
              </span>
            </div>
          </Link>

          {/* Professional card */}
          <Link
            href="/get-started/designer"
            className="group flex flex-col rounded-3xl border-2 border-green-100 bg-green-50 hover:border-green-400 hover:bg-green-100/60 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="p-8 flex-1">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-extrabold text-lg mb-6 group-hover:scale-105 transition-transform duration-200">
                P
              </div>
              <h2 className="text-2xl font-extrabold text-zinc-900 mb-2">I&apos;m a professional</h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                Apply to join our curated network. We review every application — strong
                portfolios, reliable professionals only.
              </p>
              <ul className="space-y-2.5">
                {PRO_PERKS.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <polyline points="2 6 5 9 10 3" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-8 py-5 border-t border-green-200 flex items-center justify-between">
              <span className="text-sm font-bold text-green-700">Apply to the network</span>
              <span className="text-green-600 group-hover:translate-x-1 transition-transform duration-150">
                <ArrowRightIcon />
              </span>
            </div>
          </Link>

        </div>

        <p className="text-center text-xs text-zinc-400 mt-10">
          Not sure which fits?{" "}
          <Link href="/contact" className="text-green-700 font-semibold hover:text-green-900 transition-colors cursor-pointer">
            Contact us directly
          </Link>{" "}
          and we&apos;ll point you in the right direction.
        </p>
      </div>
    </div>
  );
}
