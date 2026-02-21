import { Link, NavLink } from "react-router-dom";
import BowIcon from "./BowIcon.jsx";
import { useCart } from "../context/CartContext.jsx";
import Toast from "./Toast.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded-full text-sm font-medium transition",
          isActive
            ? "bg-white/80 border border-blush-100 text-blush-800 shadow-soft"
            : "text-ink/70 hover:text-blush-700 hover:bg-white/60",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const { totals, toast } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40">
        <div className="bg-white/60 backdrop-blur border-b border-blush-100">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-blush-100 flex items-center justify-center shadow-soft border border-blush-200">
                <BowIcon className="w-6 h-6 text-blush-700" />
              </span>
              <div className="leading-tight">
                <div className="font-display text-lg text-blush-900">
                  customized.bychaz
                </div>
                <div className="text-xs text-ink/60 -mt-1">
                  custom • cute • faith
                </div>
              </div>
            </Link>

            <nav className="hidden sm:flex items-center gap-2">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/shop">Shop</NavItem>
              <NavItem to="/contact">Contact</NavItem>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              <Link
                to="/cart"
                className="relative inline-flex items-center gap-2 rounded-full bg-blush-600 text-white px-4 py-2 shadow-glow hover:brightness-105 transition"
              >
                <span className="text-sm font-semibold">Cart</span>
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  {totals.count}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <Toast message={toast} />
    </>
  );
}