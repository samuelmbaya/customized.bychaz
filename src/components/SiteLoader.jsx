import BowIcon from "./BowIcon.jsx";

export default function SiteLoader({ done }) {
  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-blush-50 flex items-center justify-center">
      <div className="bg-white/80 border border-blush-100 rounded-3xl shadow-soft px-10 py-10 text-center backdrop-blur">
        <div className="mx-auto w-16 h-16 rounded-full bg-blush-100 border border-blush-200 flex items-center justify-center shadow-soft">
          <BowIcon className="w-10 h-10 text-blush-700" />
        </div>
        <div className="font-display text-2xl text-blush-900 mt-4">Loading something cute…</div>
        <div className="mt-4 h-2 w-56 bg-blush-100 rounded-full overflow-hidden mx-auto">
          <div className="h-full w-1/2 shimmer" />
        </div>
      </div>
    </div>
  );
}