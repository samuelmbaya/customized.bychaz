export default function BowIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M30 30c-3-6-12-14-19-12-7 2-7 12-1 17 6 5 15 2 20-5Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M34 30c3-6 12-14 19-12 7 2 7 12 1 17-6 5-15 2-20-5Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M32 28c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7Z"
        fill="currentColor"
      />
      <path
        d="M30 41c-1 6-3 12-8 16 4-1 9-4 10-9 1 5 6 8 10 9-5-4-7-10-8-16h-4Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}