import BowDivider from "../components/BowDivider.jsx";
import Quantity from "../components/Quantity.jsx";
import { useCart } from "../context/CartContext.jsx";
import { moneyZAR } from "../utils/money.js";
import { buildOrderMessage, buildWhatsAppUrl } from "../utils/whatsapp.js";

export default function Cart() {
  const { items, totals, removeItem, setQty, clearCart } = useCart();

  const subtotalLabel = moneyZAR(totals.subtotal);

  // ✅ Change this to her real WhatsApp number (South Africa example without +): 27XXXXXXXXX
  const WHATSAPP_NUMBER = "27817118312";

  const message = buildOrderMessage({
    shopName: "Bow Boutique",
    items,
    subtotal: subtotalLabel,
  });

  const whatsappUrl = buildWhatsAppUrl({
    phoneE164: WHATSAPP_NUMBER,
    message,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
      <section className="bg-white/70 backdrop-blur border border-blush-100 shadow-soft rounded-3xl p-6 sm:p-8">
        <h2 className="font-display text-3xl text-blush-900">Your Cart</h2>
        <p className="text-sm text-ink/65 mt-1">
          Your custom details are saved here.
        </p>

        <BowDivider label={`${items.length} item(s)`} />

        {items.length === 0 ? (
          <div className="text-ink/70">
            Your cart is empty. Go add something cute.
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/70 border border-blush-100 rounded-3xl p-5 shadow-soft flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-36 h-28 object-cover rounded-2xl border border-blush-100"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-display text-xl text-blush-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-ink/65 mt-1">
                          {moneyZAR(item.price)} each
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-semibold text-blush-700 hover:text-blush-900"
                      >
                        Remove
                      </button>
                    </div>

                    {item.customization && Object.keys(item.customization).length > 0 && (
                      <div className="mt-3 text-sm bg-blush-50 border border-blush-100 rounded-2xl p-3 text-ink/75">
                        {Object.entries(item.customization)
                          .filter(([, v]) => v && String(v).trim())
                          .map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-4">
                              <span className="font-semibold text-blush-900">{labelize(k)}</span>
                              <span className="text-right">{v}</span>
                            </div>
                          ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <Quantity value={item.qty} onChange={(q) => setQty(item.id, q)} />
                      <div className="text-sm font-semibold text-blush-900">
                        Line: {moneyZAR(item.qty * item.price)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-white/70 border border-blush-100 rounded-3xl p-6 shadow-soft h-fit">
              <div className="font-display text-2xl text-blush-900">Summary</div>

              <div className="mt-4 space-y-2 text-sm text-ink/70">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span className="font-semibold text-ink/80">{totals.count}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-blush-900">{subtotalLabel}</span>
                </div>
                <div className="text-xs text-ink/50 mt-2">
                  Delivery/collection will be confirmed on WhatsApp.
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block text-center rounded-full bg-blush-600 text-white px-6 py-3 font-semibold shadow-glow hover:brightness-105 transition"
              >
                Checkout via WhatsApp
              </a>

              <button
                onClick={clearCart}
                className="mt-3 w-full rounded-full bg-white/70 border border-blush-100 text-blush-800 px-6 py-3 font-semibold shadow-soft hover:bg-white transition"
              >
                Clear cart
              </button>

              <BowDivider label="Message Preview" />
              <pre className="text-xs whitespace-pre-wrap bg-blush-50 border border-blush-100 rounded-2xl p-3 text-ink/70">
                {message}
              </pre>

              <div className="text-[11px] text-ink/45 mt-3">
                Replace <b>27XXXXXXXXX</b> in <b>Cart.jsx</b> with her real number.
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}

function labelize(key) {
  const map = {
    nameText: "Name",
    yearText: "Year",
    verseText: "Bible verse",
    phoneModel: "Phone model",
    metalColor: "Metal color",
    fontStyle: "Font style",
    neonColor: "Neon color",
    caseColor: "Case color",
    noteText: "Notes",
  };
  return map[key] || key;
}