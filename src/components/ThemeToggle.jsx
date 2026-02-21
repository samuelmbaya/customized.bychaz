import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "soft" ? "extra" : "soft")}
      className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/70 border border-blush-100 px-4 py-2 text-sm font-semibold text-blush-800 shadow-soft hover:bg-white transition"
      title="Toggle Pink Mode"
    >
      {theme === "soft" ? "Soft Pink" : "Extra Pink"}
    </button>
  );
}