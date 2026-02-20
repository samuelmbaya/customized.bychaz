import BowIcon from "./BowIcon.jsx";

export default function BowBadge({ text = "Custom" }) {
  return (
    <div className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-3 py-1 shadow-soft border border-blush-100">
      <BowIcon className="w-4 h-4 text-blush-600" />
      <span className="text-xs font-semibold text-blush-800">{text}</span>
    </div>
  );
}