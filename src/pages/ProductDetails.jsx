import { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { products } from "../data/products.jsx";
import BowDivider from "../components/BowDivider.jsx";
import Quantity from "../components/Quantity.jsx";
import BowIcon from "../components/BowIcon.jsx";
import { useCart } from "../context/CartContext.jsx";
import { moneyZAR } from "../utils/money.js";

import CustomPreview from "../components/CustomPreview.jsx";
import ColorPicker from "../components/ColorPicker.jsx";
import FontPicker from "../components/FontPicker.jsx";

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="text-sm font-semibold text-blush-900">{label}</div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { addToCart } = useCart();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);
  const [qty, setQty] = useState(1);

  const [form, setForm] = useState({
    nameText: "",
    yearText: "",
    verseText: "",
    phoneModel: "",
    metalColor: "Gold",
    fontStyle: "Elegant",
    neonColor: "Hot Pink",
    caseColor: "Pink",
    noteText: "",
  });

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <div className="bg-white/70 border border-blush-100 shadow-soft rounded-3xl p-8">
          <div className="font-display text-2xl text-blush-900">
            Product not found
          </div>
          <button
            className="mt-4 rounded-full bg-blush-600 text-white px-6 py-3 font-semibold shadow-glow"
            onClick={() => nav("/shop")}
          >
            Back to shop
          </button>
        </div>
      </div>
    );
  }

  const requiredKeys = product.customizable || [];
  const customization = requiredKeys.reduce((acc, k) => {
    acc[k] = form[k] || "";
    return acc;
  }, {});

  function validateCustomization() {
    const mustHave = ["nameText", "yearText", "verseText", "phoneModel"];
    return requiredKeys.filter(
      (k) => mustHave.includes(k) && !String(form[k] || "").trim()
    );
  }

  const missing = validateCustomization();

  // Preview type (for live preview card)
  const previewType = product.id.includes("neon")
    ? "neon"
    : product.id.includes("sign") ||
      product.id.includes("decoration") ||
      product.id.includes("door") ||
      product.id.includes("toy")
    ? "sign"
    : product.id.includes("mirror")
    ? "mirror"
    : "jewelry";

  const previewText =
    form.nameText || form.verseText || form.yearText || form.phoneModel || "";

  const previewAccent =
    form.caseColor || form.metalColor || form.neonColor || "Pink";

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT: Product */}
        <section className="bg-white/70 backdrop-blur border border-blush-100 shadow-soft rounded-3xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[340px] object-cover"
          />
          <div className="p-6">
            <div className="inline-flex items-center gap-2 bg-blush-100 text-blush-800 px-4 py-2 rounded-full text-sm font-semibold">
              <BowIcon className="w-5 h-5" />
              {product.category.toUpperCase()}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl text-blush-900 mt-3">
              {product.name}
            </h1>

            <p className="text-ink/70 mt-2">{product.short}</p>

            <div className="mt-5 flex items-center justify-between">
              <div className="text-xl font-semibold text-blush-800">
                {moneyZAR(product.price)}
              </div>
              <Link
                to="/shop"
                className="text-sm font-semibold text-blush-700 hover:text-blush-900"
              >
                ← Back to shop
              </Link>
            </div>

            {/* Share product */}
            <button
              type="button"
              onClick={() => {
                const msg = `Check this out: ${product.name} 💗\n${window.location.href}`;
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(msg)}`,
                  "_blank"
                );
              }}
              className="mt-4 w-full rounded-full bg-white/70 border border-blush-100 text-blush-800 px-6 py-3 font-semibold shadow-soft hover:bg-white transition"
            >
              Share on WhatsApp
            </button>
          </div>
        </section>

        {/* RIGHT: Customization */}
        <section className="bg-white/70 backdrop-blur border border-blush-100 shadow-soft rounded-3xl p-6 sm:p-8">
          <div className="font-display text-2xl text-blush-900">Customize</div>
          <p className="text-sm text-ink/65 mt-1">
            Fill what applies. Then add to cart.
          </p>

          {/* Live preview */}
          <div className="mt-5">
            <CustomPreview type={previewType} text={previewText} accent={previewAccent} />
          </div>

          <BowDivider label="Details" />

          <div className="grid sm:grid-cols-2 gap-4">
            {requiredKeys.includes("nameText") && (
              <Field label="Name (required)">
                <input
                  value={form.nameText}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, nameText: e.target.value }))
                  }
                  className="w-full rounded-2xl bg-white/70 border border-blush-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blush-300"
                  placeholder="e.g. Thando"
                />
              </Field>
            )}

            {requiredKeys.includes("yearText") && (
              <Field label="Birth year (required)">
                <input
                  value={form.yearText}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, yearText: e.target.value }))
                  }
                  className="w-full rounded-2xl bg-white/70 border border-blush-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blush-300"
                  placeholder="e.g. 2002"
                  inputMode="numeric"
                />
              </Field>
            )}

            {requiredKeys.includes("verseText") && (
              <Field label="Bible verse (required)">
                <input
                  value={form.verseText}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, verseText: e.target.value }))
                  }
                  className="w-full rounded-2xl bg-white/70 border border-blush-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blush-300"
                  placeholder="e.g. Psalm 23:1"
                />
              </Field>
            )}

            {requiredKeys.includes("phoneModel") && (
              <Field label="Phone model (required)">
                <input
                  value={form.phoneModel}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phoneModel: e.target.value }))
                  }
                  className="w-full rounded-2xl bg-white/70 border border-blush-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blush-300"
                  placeholder="e.g. iPhone 13 / Samsung A54"
                />
              </Field>
            )}

            {/* Metal color as circles */}
            {requiredKeys.includes("metalColor") && (
              <ColorPicker
                label="Metal color"
                value={form.metalColor}
                onChange={(v) => setForm((p) => ({ ...p, metalColor: v }))}
              />
            )}

            {/* Font picker visual */}
            {requiredKeys.includes("fontStyle") && (
              <FontPicker
                value={form.fontStyle}
                onChange={(v) => setForm((p) => ({ ...p, fontStyle: v }))}
              />
            )}

            {/* Neon color (keep dropdown, because it’s many options) */}
            {requiredKeys.includes("neonColor") && (
              <Field label="Neon color">
                <select
                  value={form.neonColor}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, neonColor: e.target.value }))
                  }
                  className="w-full rounded-2xl bg-white/70 border border-blush-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blush-300"
                >
                  <option>Hot Pink</option>
                  <option>Soft Pink</option>
                  <option>White</option>
                  <option>Purple</option>
                  <option>Blue</option>
                </select>
              </Field>
            )}

            {/* Case color as circles */}
            {requiredKeys.includes("caseColor") && (
              <ColorPicker
                label="Case color"
                value={form.caseColor}
                onChange={(v) => setForm((p) => ({ ...p, caseColor: v }))}
              />
            )}

            {requiredKeys.includes("noteText") && (
              <div className="sm:col-span-2">
                <Field label="Notes (optional)">
                  <textarea
                    value={form.noteText}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, noteText: e.target.value }))
                    }
                    rows={3}
                    className="w-full rounded-2xl bg-white/70 border border-blush-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blush-300"
                    placeholder="Colors, size request, special instructions…"
                  />
                </Field>
              </div>
            )}
          </div>

          {/* Turnaround */}
          <div className="mt-5 bg-blush-50 border border-blush-100 rounded-3xl p-4 text-sm text-ink/70">
            <div className="font-semibold text-blush-900">Turnaround</div>
            <div className="mt-1">
              Estimated: <b>3–5 working days</b> for most customs (confirm on WhatsApp).
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
            <Quantity value={qty} onChange={setQty} />

            <button
              type="button"
              disabled={missing.length > 0}
              onClick={() => addToCart(product, customization, qty)}
              className={[
                "rounded-full px-6 py-3 font-semibold shadow-glow transition",
                missing.length > 0
                  ? "bg-ink/15 text-ink/50 cursor-not-allowed"
                  : "bg-blush-600 text-white hover:brightness-105",
              ].join(" ")}
            >
              Add to cart
            </button>
          </div>

          {missing.length > 0 && (
            <div className="mt-3 text-xs text-blush-800 bg-blush-100 border border-blush-200 rounded-2xl p-3">
              Please fill: <b>{missing.join(", ")}</b>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}