import bow from "../assets/favicon.png";

export default function BowIcon({ className = "w-6 h-6" }) {
  return (
    <img
      src={bow}
      alt="Bow"
      className={`${className} object-contain`}
      draggable="false"
    />
  );
}