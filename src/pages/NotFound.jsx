import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-10">
      <div className="bg-white/70 border border-blush-100 shadow-soft rounded-3xl p-8">
        <div className="font-display text-3xl text-blush-900">Oops…</div>
        <p className="text-ink/70 mt-2">That page doesn’t exist.</p>
        <Link
          to="/"
          className="inline-block mt-4 rounded-full bg-blush-600 text-white px-6 py-3 font-semibold shadow-glow"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}