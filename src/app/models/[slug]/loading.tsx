export default function ModelDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      <div className="h-6 w-32 rounded bg-slate-800" />
      <div className="h-48 rounded-3xl bg-slate-900/60 border border-slate-800" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-900/50 border border-slate-800" />
        ))}
      </div>
      <div className="h-64 rounded-3xl bg-slate-900/50 border border-slate-800" />
    </div>
  );
}
