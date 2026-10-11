import Link from "next/link";
import ClientApplicationForm from "@/components/ClientApplicationForm";
import { FadeUp } from "@/components/Motion";

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

type Props = { searchParams: Promise<{ service?: string }> };

export default async function ClientApplicationPage({ searchParams }: Props) {
  const { service = "" } = await searchParams;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Page header */}
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          <FadeUp>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-700 text-sm transition-colors duration-150 cursor-pointer mb-6"
            >
              <ArrowLeftIcon />
              Back
            </Link>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-extrabold text-lg shrink-0">
                B
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Business Request
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Find the right designer for your project
            </h1>
          </FadeUp>
          <FadeUp delay={0.22}>
            <p className="mt-3 text-zinc-500 text-base leading-relaxed max-w-xl">
              Tell us about your business and what you need. The more detail you give us, the
              better we can match you with designers who are the perfect fit.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex items-center gap-4 mt-5 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                Free to post
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                Matched within 48 hours
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                3 short sections
              </span>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Form */}
      <FadeUp delay={0.1} className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <ClientApplicationForm initialService={service} />
      </FadeUp>
    </div>
  );
}
