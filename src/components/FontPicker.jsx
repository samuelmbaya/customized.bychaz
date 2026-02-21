const fonts = [
  { label: "Elegant", value: "Elegant", className: "font-serif italic" },
  { label: "Classic", value: "Classic", className: "font-serif" },
  { label: "Bold", value: "Bold", className: "font-sans font-semibold" },
  { label: "Soft Script", value: "Soft Script", className: "font-serif italic" },
];

export default function FontPicker({ value, onChange }) {
  return (
    <div>
      <div className="text-sm font-semibold text-blush-900">Font style</div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {fonts.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => onChange(f.value)}
            className={[
              "rounded-2xl border px-4 py-3 text-left bg-white/70 transition shadow-soft",
              value === f.value ? "border-blush-500 ring-2 ring-blush-300" : "border-blush-100 hover:bg-white",
            ].join(" ")}
          >
            <div className="text-xs text-ink/50">Preview</div>
            <div className={["text-sm text-blush-900", f.className].join(" ")}>
              {f.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}