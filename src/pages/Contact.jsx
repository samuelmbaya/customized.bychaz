import BowDivider from "../components/BowDivider.jsx";

export default function Contact() {

  const whatsappNumber = "27817118312";

  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const instagramLink = "https://www.instagram.com/customized.bychaz/";

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
      <section className="bg-white/70 backdrop-blur border border-blush-100 shadow-soft rounded-3xl p-6 sm:p-10">
        
        <h2 className="font-display text-3xl text-blush-900">Contact</h2>
        <p className="text-sm text-ink/65 mt-1">
          Orders usually go fastest on WhatsApp.
        </p>

        <BowDivider label="Details" />

        <div className="grid md:grid-cols-2 gap-6">

          {/* WHATSAPP */}
          <div className="bg-white/70 border border-blush-100 rounded-3xl p-6 shadow-soft">
            <div className="font-display text-xl text-blush-900">
              WhatsApp
            </div>

            <p className="text-sm text-ink/65 mt-2">
              Fast replies for custom orders & enquiries.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 rounded-full bg-green-500 text-white px-6 py-3 font-semibold shadow-lg hover:brightness-110 transition"
            >
              {/* WhatsApp Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5"
                fill="currentColor"
              >
                <path d="M16 .5C7.5.5.5 7.5.5 16c0 2.8.7 5.5 2.1 7.9L.5 31.5l7.8-2c2.3 1.3 4.9 2 7.7 2 8.5 0 15.5-7 15.5-15.5S24.5.5 16 .5zm0 28c-2.4 0-4.7-.6-6.8-1.7l-.5-.3-4.6 1.2 1.2-4.5-.3-.5C3.6 20.7 3 18.4 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13-5.8 12.5-13 12.5zm7.1-9.3c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.7-.2-1 .2-.3.4-1.1 1.2-1.3 1.4-.2.2-.4.2-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.1-.8.1-.1.4-.4.5-.6.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7 0-.2-1-2.4-1.4-3.3-.3-.9-.7-.7-1-.7h-.8c-.3 0-.7.1-1 .4-.3.3-1.3 1.2-1.3 3 0 1.8 1.3 3.6 1.5 3.9.2.3 2.6 4 6.3 5.6.9.4 1.6.6 2.2.8.9.3 1.7.2 2.3.1.7-.1 2.3-.9 2.6-1.7.3-.8.3-1.5.2-1.7-.1-.2-.4-.3-.8-.5z"/>
              </svg>

              Visit on WhatsApp
            </a>

            <div className="mt-4 text-sm text-ink/70">
              <div><span className="font-semibold text-blush-900">Business hours:</span> Mon–Sat</div>
              <div><span className="font-semibold text-blush-900">Delivery:</span> Local (arranged)</div>
              <div><span className="font-semibold text-blush-900">Collection:</span> Optional</div>
            </div>
          </div>


          {/* INSTAGRAM */}
          <div className="bg-white/70 border border-blush-100 rounded-3xl p-6 shadow-soft">
            <div className="font-display text-xl text-blush-900">
              Instagram
            </div>

            <p className="text-sm text-ink/65 mt-2">
              See our latest customs, neon lights & pretty pink drops.
            </p>

            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-500 text-white px-6 py-3 font-semibold shadow-lg hover:brightness-110 transition"
            >
              {/* Instagram Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="currentColor"
              >
                <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm8.5 2A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4h8.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.75-2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg>

              Visit on Instagram
            </a>

            <div className="mt-4 text-sm text-ink/70">
              <div><span className="font-semibold text-blush-900">DMs:</span> Open</div>
              <div><span className="font-semibold text-blush-900">Custom requests:</span> Welcome</div>
              <div><span className="font-semibold text-blush-900">Style:</span> Pink & pretty 🎀</div>
            </div>
          </div>

        </div>

        <BowDivider label="Tip" />

        <div className="text-sm text-ink/70">
          For a premium look: use matching pink product backgrounds and consistent lighting in photos.
        </div>

      </section>
    </div>
  );
}