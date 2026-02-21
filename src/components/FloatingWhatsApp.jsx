export default function FloatingWhatsApp({ phoneE164 = "27817118312" }) {
  const link = `https://wa.me/${phoneE164}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-6 right-6 w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center hover:brightness-110 transition"
      title="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor">
        <path d="M16 .5C7.5.5.5 7.5.5 16c0 2.8.7 5.5 2.1 7.9L.5 31.5l7.8-2c2.3 1.3 4.9 2 7.7 2 8.5 0 15.5-7 15.5-15.5S24.5.5 16 .5zm0 28c-2.4 0-4.7-.6-6.8-1.7l-.5-.3-4.6 1.2 1.2-4.5-.3-.5C3.6 20.7 3 18.4 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13-5.8 12.5-13 12.5zm7.1-9.3c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.7-.2-1 .2-.3.4-1.1 1.2-1.3 1.4-.2.2-.4.2-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.1-.8.1-.1.4-.4.5-.6.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7 0-.2-1-2.4-1.4-3.3-.3-.9-.7-.7-1-.7h-.8c-.3 0-.7.1-1 .4-.3.3-1.3 1.2-1.3 3 0 1.8 1.3 3.6 1.5 3.9.2.3 2.6 4 6.3 5.6.9.4 1.6.6 2.2.8.9.3 1.7.2 2.3.1.7-.1 2.3-.9 2.6-1.7.3-.8.3-1.5.2-1.7-.1-.2-.4-.3-.8-.5z"/>
      </svg>
    </a>
  );
}