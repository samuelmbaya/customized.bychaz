import BowDivider from "../components/BowDivider.jsx";

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
      <section className="bg-white/70 backdrop-blur border border-blush-100 shadow-soft rounded-3xl p-6 sm:p-10">
        <h2 className="font-display text-3xl text-blush-900">Contact</h2>
        <p className="text-sm text-ink/65 mt-1">
          Orders usually go fastest on WhatsApp.
        </p>

        <BowDivider label="Details" />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/70 border border-blush-100 rounded-3xl p-6 shadow-soft">
            <div className="font-display text-xl text-blush-900">WhatsApp</div>
            <p className="text-sm text-ink/65 mt-2">
              Add her WhatsApp number and a click-to-chat button here.
            </p>
            <div className="mt-4 text-sm text-ink/70">
              <div><span className="font-semibold text-blush-900">Business hours:</span> Mon–Sat</div>
              <div><span className="font-semibold text-blush-900">Delivery:</span> Local (arranged)</div>
              <div><span className="font-semibold text-blush-900">Collection:</span> Optional</div>
            </div>
          </div>

          <div className="bg-white/70 border border-blush-100 rounded-3xl p-6 shadow-soft">
            <div className="font-display text-xl text-blush-900">Instagram</div>
            <p className="text-sm text-ink/65 mt-2">
              Add her Instagram handle and link it.
            </p>
            <div className="mt-4 text-sm text-ink/70">
              <div><span className="font-semibold text-blush-900">DMs:</span> Open</div>
              <div><span className="font-semibold text-blush-900">Custom requests:</span> Welcome</div>
              <div><span className="font-semibold text-blush-900">Style:</span> Pink & pretty 🎀</div>
            </div>
          </div>
        </div>

        <BowDivider label="Tip" />
        <div className="text-sm text-ink/70">
          If you want a “premium” look: add real product photos (even iPhone pics),
          consistent lighting, and matching pink backgrounds.
        </div>
      </section>
    </div>
  );
}