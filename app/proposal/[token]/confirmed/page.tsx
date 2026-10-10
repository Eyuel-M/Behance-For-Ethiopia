type Props = { params: Promise<{ token: string }>; searchParams: Promise<{ choice?: string }> };

export default async function ConfirmedPage({ params, searchParams }: Props) {
  const { token } = await params;
  const { choice } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ backgroundColor: "#0d2318" }}>
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto px-5 py-4">
          <span className="text-sm font-black" style={{ color: "#6dcc46" }}>Hire Ethiopia&apos;s Best</span>
        </div>
      </div>

      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "rgba(109,204,70,0.12)", border: "1px solid rgba(109,204,70,0.25)" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6dcc46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(109,204,70,0.7)" }}>
          Selection received
        </p>
        <h1 className="text-3xl font-black text-white mb-4">
          {choice ? `You chose Designer ${choice}` : "Great choice!"}
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          Our team has been notified and will confirm the match within 1 business day. We&apos;ll introduce you to your designer and help you get started.
        </p>
        <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.25)" }}>
          Questions? Reply to the email you received from our team.
        </p>
      </div>
    </div>
  );
}
