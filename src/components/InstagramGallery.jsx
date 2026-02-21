const items = [
  { id: 1, img: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80", label: "Neon glow" },
  { id: 2, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80", label: "Name chain" },
  { id: 3, img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80", label: "Lash mirror" },
  { id: 4, img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80", label: "Door sign" },
  { id: 5, img: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80", label: "Sunset lamp" },
  { id: 6, img: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=1200&q=80", label: "Nail bow" },
];

export default function InstagramGallery() {
  return (
    <div className="bg-white/70 border border-blush-100 rounded-3xl shadow-soft p-6 sm:p-8">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="font-display text-2xl text-blush-900">Recent customs</div>
          <div className="text-sm text-ink/65 mt-1">A little preview of the vibe.</div>
        </div>

        <a
          href="https://www.instagram.com/customized.bychaz/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-500 text-white px-5 py-2 text-sm font-semibold shadow-lg hover:brightness-110 transition"
        >
          Visit Instagram
        </a>
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((x) => (
          <div key={x.id} className="relative overflow-hidden rounded-2xl border border-blush-100">
            <img src={x.img} alt={x.label} className="h-40 w-full object-cover" loading="lazy" />
            <div className="absolute bottom-2 left-2 bg-white/75 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-blush-900 border border-blush-100">
              {x.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}