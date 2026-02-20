import BowIcon from "./BowIcon.jsx";

export default function BowDivider({ label }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="h-px flex-1 shimmer rounded-full" />
      <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur rounded-full shadow-soft border border-blush-100">
        <BowIcon className="w-5 h-5 text-blush-600" />
        {label ? (
          <span className="text-sm font-medium text-blush-800">{label}</span>
        ) : (
          <span className="text-sm font-medium text-blush-800">♡</span>
        )}
        <BowIcon className="w-5 h-5 text-blush-600" />
      </div>
      <div className="h-px flex-1 shimmer rounded-full" />
    </div>
  );
}