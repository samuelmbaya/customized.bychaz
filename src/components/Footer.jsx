import BowDivider from "./BowDivider.jsx";

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <BowDivider label="Made with love & a little sparkle" />
        <div className="bg-white/70 backdrop-blur border border-blush-100 shadow-soft rounded-3xl p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-xl text-blush-900">customized.bychaz</div>
            <p className="text-sm text-ink/70 mt-1">
              Custom pieces • Pretty details • Faith-friendly vibes
            </p>
          </div>
          <div className="text-sm text-ink/70">
            <div>WhatsApp orders • Instagram DMs • Local delivery/collection</div>
            <div className="mt-1 text-xs text-ink/50">
              © {new Date().getFullYear()} Bow Boutique
            </div>
          </div>
        </div>
        <div className="h-10" />
      </div>
    </footer>
  );
}