export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
      <div className="h-44 rounded-3xl bg-slate-900/60 border border-slate-800" />
      <div className="h-10 w-96 rounded-full bg-slate-900/60 border border-slate-800" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="h-96 rounded-2xl bg-slate-900/50 border border-slate-800" />
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-900/50 border border-slate-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
