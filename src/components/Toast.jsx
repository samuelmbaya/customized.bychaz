export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed z-50 bottom-6 left-1/2 -translate-x-1/2">
      <div className="bg-white/85 backdrop-blur border border-blush-100 shadow-soft rounded-full px-5 py-3 text-sm font-medium text-blush-800">
        {message}
      </div>
    </div>
  );
}