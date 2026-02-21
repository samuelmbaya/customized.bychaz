export default function CustomPreview({ type, text, accent = "Pink" }) {
  const label = text?.trim() ? text.trim() : "Your Text";
  const isNeon = type === "neon";
  const isSign = type === "sign";
  const isJewelry = type === "jewelry";
  const isMirror = type === "mirror";

  const glow = isNeon
    ? "shadow-[0_0_30px_rgba(255,90,173,0.55)]"
    : "shadow-soft";

  return (
    <div className="bg-white/70 border border-blush-100 rounded-3xl p-6 shadow-soft">
      <div className="text-sm font-semibold text-blush-900">Live preview</div>

      <div className="mt-4 rounded-3xl border border-blush-100 bg-gradient-to-br from-blush-100 via-white to-blush-200 p-6">
        <div
          className={[
            "rounded-3xl bg-white/70 border border-blush-100 p-8 text-center",
            glow,
          ].join(" ")}
        >
          <div className="text-xs text-ink/50 mb-2">
            {isNeon
              ? "Neon"
              : isSign
              ? "Name Sign"
              : isMirror
              ? "Mirror"
              : isJewelry
              ? "Jewelry"
              : "Custom"}{" "}
            • {accent}
          </div>

          <div
            className={[
              "font-display text-3xl sm:text-4xl text-blush-900",
              isNeon
                ? "neon-flicker drop-shadow-[0_0_16px_rgba(255,90,173,0.65)]"
                : "",
            ].join(" ")}
          >
            {label}
          </div>

          {isJewelry && (
            <div className="mt-3 text-xs text-ink/55">
              (Preview only — actual piece may vary slightly.)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}