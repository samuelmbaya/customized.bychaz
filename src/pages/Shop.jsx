import { useMemo, useState } from "react";
import BowDivider from "../components/BowDivider.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { categories, products } from "../data/products.jsx";

export default function Shop() {
  const [active, setActive] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const byCat = active === "all" ? products : products.filter((p) => p.category === active);
    const query = q.trim().toLowerCase();
    if (!query) return byCat;
    return byCat.filter((p) => p.name.toLowerCase().includes(query) || p.short.toLowerCase().includes(query));
  }, [active, q]);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
      <section className="bg-white/70 backdrop-blur border border-blush-100 shadow-soft rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl text-blush-900">Shop</h2>
            <p className="text-sm text-ink/65 mt-1">
              Choose something cute, then customize it.
            </p>
          </div>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search… (name chain, neon, phone case)"
            className="w-full sm:w-80 rounded-full bg-white/70 border border-blush-100 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-blush-300"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={[
                "px-4 py-2 rounded-full text-sm font-semibold border transition",
                active === c.id
                  ? "bg-blush-600 text-white border-blush-600 shadow-glow"
                  : "bg-white/70 text-blush-800 border-blush-100 hover:bg-white",
              ].join(" ")}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <BowDivider label={`${filtered.length} items`} />

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </div>
  );
}