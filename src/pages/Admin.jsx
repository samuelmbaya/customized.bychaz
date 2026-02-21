import { useEffect, useState } from "react";
import BowDivider from "../components/BowDivider.jsx";
import { products as defaultProducts } from "../data/products.jsx";

const KEY = "bow_boutique_products_v1";

function loadProducts() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

export function getProductsOverride() {
  return loadProducts();
}

export default function Admin() {
  const [items, setItems] = useState(loadProducts);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  function update(id, patch) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function reset() {
    localStorage.removeItem(KEY);
    setItems(defaultProducts);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
      <section className="bg-white/70 border border-blush-100 rounded-3xl shadow-soft p-6 sm:p-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-display text-3xl text-blush-900">Admin</div>
            <div className="text-sm text-ink/65 mt-1">Edit prices + names (saved in this browser).</div>
          </div>
          <button
            onClick={reset}
            className="rounded-full bg-white/70 border border-blush-100 text-blush-800 px-6 py-3 font-semibold shadow-soft hover:bg-white transition"
          >
            Reset to default
          </button>
        </div>

        <BowDivider label="Products" />

        <div className="space-y-3">
          {items.map((p) => (
            <div key={p.id} className="bg-white/70 border border-blush-100 rounded-3xl p-4 shadow-soft">
              <div className="grid md:grid-cols-4 gap-3 items-center">
                <div className="md:col-span-2">
                  <div className="text-xs text-ink/50">Name</div>
                  <input
                    value={p.name}
                    onChange={(e) => update(p.id, { name: e.target.value })}
                    className="w-full rounded-2xl bg-white/70 border border-blush-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blush-300"
                  />
                </div>
                <div>
                  <div className="text-xs text-ink/50">Price</div>
                  <input
                    value={p.price}
                    onChange={(e) => update(p.id, { price: Number(e.target.value || 0) })}
                    className="w-full rounded-2xl bg-white/70 border border-blush-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blush-300"
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <div className="text-xs text-ink/50">Category</div>
                  <input
                    value={p.category}
                    onChange={(e) => update(p.id, { category: e.target.value })}
                    className="w-full rounded-2xl bg-white/70 border border-blush-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blush-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}