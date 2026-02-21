import { useEffect, useMemo, useState } from "react";
import BowIcon from "./BowIcon.jsx";

const VERSES = [
  "Trust in the Lord with all your heart and lean not on your own understanding. — Proverbs 3:5",
  "She is clothed with strength and dignity; and she shall rejoice in time to come. — Proverbs 31:25",
  "I can do all things through Christ who strengthens me. — Philippians 4:13",
  "The Lord is my shepherd; I shall not want. — Psalm 23:1",
  "Be strong and courageous… for the Lord your God will be with you. — Joshua 1:9",
  "The Lord will fight for you; you need only to be still. — Exodus 14:14",
  "For I know the plans I have for you… plans to give you hope and a future. — Jeremiah 29:11",
];

export default function SiteLoader({ done }) {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  // verse rotation
  const [verseIndex, setVerseIndex] = useState(0);
  const [verseFade, setVerseFade] = useState(false);

  useEffect(() => {
    setVerseIndex(Math.floor(Math.random() * VERSES.length));
  }, []);

  useEffect(() => {
    if (done) return;

    const interval = setInterval(() => {
      setVerseFade(true);
      const swap = setTimeout(() => {
        setVerseIndex((i) => (i + 1) % VERSES.length);
        setVerseFade(false);
      }, 260);

      return () => clearTimeout(swap);
    }, 2200);

    return () => clearInterval(interval);
  }, [done]);

  useEffect(() => {
    if (done) {
      setFade(true);
      const t = setTimeout(() => setVisible(false), 1100);
      return () => clearTimeout(t);
    }
  }, [done]);

  const currentVerse = useMemo(() => VERSES[verseIndex], [verseIndex]);

  if (!visible) return null;

  const bows = Array.from({ length: 34 }, (_, i) => {
    const left = Math.round(((i * 27) % 100) + 1);
    const size = 14 + ((i * 11) % 34);
    const delay = (i % 18) * 0.18;
    const duration = 7.8 + (i % 10) * 0.85;
    const opacity = 0.2 + (i % 7) * 0.1;
    const spin = (i % 2 === 0 ? 1 : -1) * (90 + (i % 6) * 25);
    const drift = (i % 2 === 0 ? 1 : -1) * (18 + (i % 9) * 9);

    const depth = (i % 5) + 1;
    const blur = depth >= 4 ? 1.4 : depth === 3 ? 0.7 : 0;
    const scale = depth >= 4 ? 0.85 : depth === 3 ? 0.95 : 1;

    return { id: i, left, size, delay, duration, opacity, spin, drift, blur, scale };
  });

  const sparkles = Array.from({ length: 18 }, (_, i) => {
    const left = Math.round(((i * 61) % 100) + 1);
    const size = 6 + (i % 6) * 2;
    const delay = (i % 9) * 0.35;
    const duration = 6.5 + (i % 7) * 1.15;
    const opacity = 0.16 + (i % 6) * 0.08;
    return { id: i, left, size, delay, duration, opacity };
  });

  return (
    <div className={`bow-loader ${fade ? "bow-loader--fade" : ""}`}>
      <div className="bow-loader__aurora" aria-hidden="true" />
      <div className="bow-loader__fog" aria-hidden="true" />
      <div className="bow-loader__glitter" aria-hidden="true" />

      <div className="bow-loader__rain" aria-hidden="true">
        {bows.map((b) => (
          <span
            key={b.id}
            className={[
              "bow-loader__bow",
              b.id % 3 === 0 ? "bow-loader__bow--white" : "bow-loader__bow--pink",
            ].join(" ")}
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              opacity: b.opacity,
              filter: `drop-shadow(0 12px 18px rgba(255,90,173,0.12)) blur(${b.blur}px)`,
              transform: `scale(${b.scale})`,
              ["--spin-deg"]: `${b.spin}deg`,
              ["--drift-x"]: `${b.drift}px`,
            }}
          >
            <BowIcon className="w-full h-full" />
          </span>
        ))}
      </div>

      <div className="bow-loader__sparkles" aria-hidden="true">
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="bow-loader__sparkle"
            style={{
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      <div className="bow-loader__center">
        <div className="bow-loader__card">
          <div className="bow-loader__pulse" aria-hidden="true" />

          <div className="bow-loader__badge">
            <BowIcon className="w-10 h-10 text-blush-700" />
          </div>

          <div className="bow-loader__title">customized.bychaz</div>
          <div className="bow-loader__subtitle">custom • cute • faith</div>

          {/* Verse is now transparent + same color as heading */}
          <div className={`bow-loader__verseText ${verseFade ? "bow-loader__verseText--fade" : ""}`}>
            “{currentVerse}”
          </div>

          <div className="bow-loader__bar" aria-hidden="true">
            <span className="bow-loader__barFill" />
          </div>

          <div className="bow-loader__tiny">Loading something dreamy…</div>
        </div>
      </div>
    </div>
  );
}