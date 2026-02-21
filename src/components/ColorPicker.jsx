const colors = [
  { name: "Pink", value: "Pink", className: "bg-blush-400" },
  { name: "White", value: "White", className: "bg-white border border-blush-100" },
  { name: "Clear", value: "Clear", className: "bg-white/30 border border-blush-100" },
  { name: "Gold", value: "Gold", className: "bg-yellow-300" },
  { name: "Silver", value: "Silver", className: "bg-gray-200" },
  { name: "Rose Gold", value: "Rose Gold", className: "bg-rose-300" },
];

export default function ColorPicker({ value, onChange, label = "Color" }) {
  return (
    <div>
      <div className="text-sm font-semibold text-blush-900">{label}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => onChange(c.value)}
            className={[
              "w-10 h-10 rounded-full shadow-soft transition hover:scale-[1.03]",
              c.className,
              value === c.value ? "ring-2 ring-blush-500" : "ring-0",
            ].join(" ")}
            title={c.name}
            aria-label={c.name}
          />
        ))}
      </div>
      <div className="mt-2 text-xs text-ink/55">Selected: <b>{value}</b></div>
    </div>
  );
}