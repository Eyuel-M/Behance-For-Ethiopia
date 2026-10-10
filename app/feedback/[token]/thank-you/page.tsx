export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ backgroundColor: "#0d2318" }}>
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(109,204,70,0.15)", border: "1px solid rgba(109,204,70,0.3)" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6dcc46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(109,204,70,0.7)" }}>Feedback received</p>
        <h1 className="text-3xl font-black text-white mb-4">Thank you!</h1>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          Your feedback has been recorded. It helps us maintain the quality of our professional network and ensures we match the right talent to every project.
        </p>
      </div>
    </div>
  );
}
