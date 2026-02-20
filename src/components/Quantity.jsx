export default function Quantity({ value, onChange }) {
  return (
    <div className="inline-flex items-center rounded-full border border-blush-100 bg-white/70 shadow-soft overflow-hidden">
      <button
        type="button"
        className="px-3 py-2 text-blush-800 hover:bg-blush-100 transition"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <div className="px-4 py-2 text-sm font-semibold text-ink/80 min-w-[3rem] text-center">
        {value}
      </div>
      <button
        type="button"
        className="px-3 py-2 text-blush-800 hover:bg-blush-100 transition"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}