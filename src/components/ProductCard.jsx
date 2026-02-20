import { Link } from "react-router-dom";
import BowBadge from "./BowBadge.jsx";
import { moneyZAR } from "../utils/money.js";

export default function ProductCard({ product }) {
  return (
    <div className="group relative bg-white/75 backdrop-blur border border-blush-100 rounded-3xl shadow-soft overflow-hidden transition hover:-translate-y-1 hover:shadow-glow">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
        {product.customizable?.length ? <BowBadge text="Custom" /> : null}
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg text-blush-900 leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-ink/65 mt-1">{product.short}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm font-semibold text-blush-800">
            {moneyZAR(product.price)}
          </div>

          <Link
            to={`/product/${product.id}`}
            className="inline-flex items-center justify-center rounded-full bg-blush-600 text-white px-4 py-2 text-sm font-semibold shadow-glow hover:brightness-105 transition"
          >
            View
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 shimmer opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
}