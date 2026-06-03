import Link from "next/link";

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

const DESIGNER_PERKS = [
  "Get matched with vetted Ethiopian businesses",
  "Set your own rates and availability",
  "Build your profile and showcase your portfolio",
  "Access steady, well-paying local & remote projects",
  "Join a community of Ethiopia's top creatives",
];

const CLIENT_PERKS = [
  "Browse 100+ vetted, skilled Ethiopian designers",
  "Get matched to the right talent within 48 hours",
  "Flexible engagements: project, retainer, or full-time",
  "Transparent pricing — no hidden fees",
  "Dedicated support throughout your project",
];

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
            Welcome
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            How would you like to get started?
          </h1>
          <p className="mt-4 text-zinc-500 text-base max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re a designer ready to grow your career, or a business looking for
            creative talent — you&apos;re in the right place.
          </p>
        </div>
      </div>

      {/* Role cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Designer card */}
          <Link
            href="/get-started/designer"
            className="group flex flex-col rounded-3xl border-2 border-green-100 bg-green-50 hover:border-green-400 hover:bg-green-100/60 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="p-8 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-black mb-6 group-hover:scale-105 transition-transform duration-200">
                <PaletteIcon />
              </div>
              <h2 className="text-2xl font-extrabold text-zinc-900 mb-2">I&apos;m a Designer</h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                Apply to join our vetted network of Ethiopian designers and connect with businesses
                that value great creative work.
              </p>
              <ul className="space-y-2.5">
                {DESIGNER_PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm text-zinc-700">
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
              <span className="text-sm font-bold text-green-700">Apply as a designer</span>
              <span className="text-green-600 group-hover:translate-x-1 transition-transform duration-150">
                <ArrowRightIcon />
              </span>
            </div>
          </Link>

          {/* Business card */}
          <Link
            href="/get-started/client"
            className="group flex flex-col rounded-3xl border-2 border-zinc-200 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="p-8 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform duration-200">
                <BriefcaseIcon />
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2">I&apos;m a Business</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Post your project and get matched with skilled Ethiopian designers who understand
                your market and can deliver world-class work.
              </p>
              <ul className="space-y-2.5">
                {CLIENT_PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-white/15 flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-8 py-5 border-t border-zinc-700 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Post a project</span>
              <span className="text-zinc-400 group-hover:translate-x-1 transition-transform duration-150">
                <ArrowRightIcon />
              </span>
            </div>
          </Link>

        </div>

        <p className="text-center text-xs text-zinc-400 mt-10">
          Already have an account?{" "}
          <Link href="/contact" className="text-green-700 font-semibold hover:text-green-900 transition-colors cursor-pointer">
            Contact us directly
          </Link>
        </p>
      </div>
    </div>
  );
}
