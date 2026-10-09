import Link from "next/link";
import DesignerApplicationForm from "@/components/DesignerApplicationForm";

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export default function DesignerApplicationPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Page header */}
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          <Link
            href="/get-started"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-700 text-sm transition-colors duration-150 cursor-pointer mb-6"
          >
            <ArrowLeftIcon />
            Back
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-black font-extrabold text-lg shrink-0">
              D
            </span>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
              Designer Application
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Join our network of vetted designers
          </h1>
          <p className="mt-3 text-zinc-500 text-base leading-relaxed max-w-xl">
            Tell us about yourself and your work. We review every application and only accept
            designers who consistently produce exceptional work.
          </p>
          <div className="flex items-center gap-4 mt-5 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Free to apply
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Response within 3–5 days
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              4 short sections
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <DesignerApplicationForm />
      </div>
    </div>
  );
}
