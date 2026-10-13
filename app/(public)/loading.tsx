export default function PublicLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#071208" }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#6dcc46", borderTopColor: "transparent" }}
        />
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(109,204,70,0.6)" }}>
          Loading
        </p>
      </div>
    </div>
  );
}
