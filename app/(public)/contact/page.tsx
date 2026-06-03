import InquiryForm from "@/components/InquiryForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — copy */}
        <div className="lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Tell us about your project
          </h1>
          <p className="mt-4 text-zinc-500 text-base leading-relaxed max-w-md">
            Fill in the form and we&apos;ll match you with the right vetted
            Ethiopian designer within 48 hours.
          </p>

          {/* Trust points */}
          <ul className="mt-10 space-y-4">
            {[
              ["Matched in 48 hours", "We review every inquiry and respond fast."],
              ["No agency fees", "Direct access to independent designers."],
              ["Vetted talent only", "Every designer is manually reviewed before listing."],
            ].map(([title, body]) => (
              <li key={title} className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-800">{title}</p>
                  <p className="text-sm text-zinc-400">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
          <InquiryForm />
        </div>

      </div>
    </div>
  );
}
