import { Link } from "react-router-dom";
import BowDivider from "../components/BowDivider.jsx";
import BowIcon from "../components/BowIcon.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.jsx";
import InstagramGallery from "../components/InstagramGallery.jsx";

export default function Home() {
  const featured = products.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
      {/* HERO */}
      <section className="bg-white/70 backdrop-blur border border-blush-100 shadow-soft rounded-3xl overflow-hidden">
        <div className="p-7 sm:p-10 grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blush-100 text-blush-800 px-4 py-2 rounded-full text-sm font-semibold">
              <BowIcon className="w-5 h-5" />
              Custom pieces made just for you
            </div>

            <h1 className="font-display text-4xl sm:text-5xl text-blush-900 mt-4 leading-tight">
              Pretty in Pink,
              <br />
              Personal by Design
            </h1>

            <p className="mt-4 text-ink/70">
              Custom name chains, neon lights, lash mirrors, and cute decor —
              all styled to match your vibe.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="rounded-full bg-blush-600 text-white px-6 py-3 font-semibold shadow-glow hover:brightness-105 transition"
              >
                Shop Customs
              </Link>
              <Link
                to="/contact"
                className="rounded-full bg-white/70 border border-blush-100 text-blush-800 px-6 py-3 font-semibold shadow-soft hover:bg-white transition"
              >
                Order / Contact
              </Link>
            </div>

            <div className="mt-6 text-xs text-ink/55">
              Tip: Most people order via WhatsApp — quick & easy.
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-blush-100 via-white to-blush-200 shadow-glow border border-blush-100 p-6">
              <div className="h-full rounded-3xl bg-white/65 border border-blush-100 flex flex-col justify-between p-6">
                <div>
                  <div className="font-display text-2xl text-blush-900">
                    How it works
                  </div>
                  <p className="text-sm text-ink/65 mt-2">
                    Boutique-simple ordering for custom items.
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    ["Choose", "Pick a product you love."],
                    ["Customize", "Add name / verse / color."],
                    ["Order", "Checkout via WhatsApp."],
                  ].map(([t, d]) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-2xl bg-white/70 border border-blush-100 p-4"
                    >
                      <span className="mt-1 w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center border border-blush-200">
                        <BowIcon className="w-5 h-5 text-blush-700" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-blush-900">
                          {t}
                        </div>
                        <div className="text-xs text-ink/60">{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-blush-200/60 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-blush-300/40 blur-2xl" />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <BowDivider label="Featured" />
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>

      <div className="mt-10 flex justify-center">
        <Link
          to="/shop"
          className="rounded-full bg-white/70 border border-blush-100 text-blush-800 px-7 py-3 font-semibold shadow-soft hover:bg-white transition"
        >
          View All Products
        </Link>
      </div>

      {/* INSTAGRAM */}
      <BowDivider label="From Instagram" />
      <InstagramGallery />
    </div>
  );
}