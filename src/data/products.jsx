export const categories = [
  { id: "all", label: "All" },
  { id: "jewelry", label: "Jewelry" },
  { id: "beauty", label: "Beauty" },
  { id: "decor", label: "Decor" },
  { id: "faith", label: "Faith" },
  { id: "phone", label: "Phone" },
];

/**
 * Images are high-quality public stock photos (safe placeholders).
 * Best practice: later replace each `image` with her real photos in `/public/images/`.
 */

export const products = [
  // =========================
  // DECOR (confirmed from IG: custom name decor + door signs + layered/round signs + neon)
  // =========================
  {
    id: "custom-name-decoration",
    name: "Custom Name Decoration",
    price: 150, // price list shows R150 :contentReference[oaicite:1]{index=1}
    category: "decor",
    image:
      "https://images.unsplash.com/photo-1520975682031-a00a29f162b3?auto=format&fit=crop&w=1200&q=80",
    short: "Personalised name decor in your colours.",
    customizable: ["nameText", "noteText"],
  },
  {
    id: "layered-acrylic-name-sign",
    name: "Layered Acrylic Name Sign",
    price: 250, // seen as layered/pretty in pink posts :contentReference[oaicite:2]{index=2}
    category: "decor",
    image:
      "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1200&q=80",
    short: "Double layered name sign (custom colours).",
    customizable: ["nameText", "noteText"],
  },
  {
    id: "round-name-sign-30cm",
    name: "Round Name Sign (30cm)",
    price: 300, // post mentions 30cm round name sign :contentReference[oaicite:3]{index=3}
    category: "decor",
    image:
      "https://images.unsplash.com/photo-1520975869019-0b6fd1c6f0c9?auto=format&fit=crop&w=1200&q=80",
    short: "Round sign for bedrooms, parties, keepsakes.",
    customizable: ["nameText", "noteText"],
  },
  {
    id: "acrylic-door-sign",
    name: "Acrylic Door Sign",
    price: 150, // posts mention acrylic door sign :contentReference[oaicite:4]{index=4}
    category: "decor",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    short: "Personalised door sign (name + theme).",
    customizable: ["nameText", "noteText"],
  },
  {
    id: "toy-box-sign",
    name: "Toy Box Name Sign",
    price: 150, // mentioned with toy box sign :contentReference[oaicite:5]{index=5}
    category: "decor",
    image:
      "https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&w=1200&q=80",
    short: "Cute personalised sign for storage/toy boxes.",
    customizable: ["nameText", "noteText"],
  },
  {
    id: "mini-bedroom-door-sign",
    name: "Mini Bedroom Door Sign",
    price: 150, // IG mentions mini customized bedroom door signs :contentReference[oaicite:6]{index=6}
    category: "decor",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
    short: "Small door sign that’s super cute.",
    customizable: ["nameText", "noteText"],
  },
  {
    id: "custom-neon-light",
    name: "Custom Neon Light",
    price: 899, // price list confirms custom neon light exists :contentReference[oaicite:7]{index=7}
    category: "decor",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    short: "Your name / business / event neon sign.",
    customizable: ["nameText", "neonColor"],
  },
  {
    id: "bible-verse-neon",
    name: "Bible Verse Neon Sign",
    price: 999,
    category: "decor",
    image:
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80",
    short: "Turn your favorite verse into a neon sign.",
    customizable: ["verseText", "neonColor"],
  },
  {
    id: "sunset-projection-lamp",
    name: "Sunset Projection Lamp",
    price: 379, // bio mentions sunset lamp :contentReference[oaicite:8]{index=8}
    category: "decor",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80",
    short: "Golden-hour vibes at home.",
    customizable: ["noteText"],
  },

  // =========================
  // JEWELRY (you requested these)
  // =========================
  {
    id: "name-chain",
    name: "Custom Name Chain",
    price: 449,
    category: "jewelry",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    short: "Your name, your shine.",
    customizable: ["nameText", "metalColor", "fontStyle"],
  },
  {
    id: "name-bracelet-chain",
    name: "Custom Name Bracelet (with Chain)",
    price: 300, // price list shows custom name bracelet R300 :contentReference[oaicite:9]{index=9}
    category: "jewelry",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80",
    short: "Cute, classy, personal.",
    customizable: ["nameText", "metalColor", "fontStyle"],
  },
  {
    id: "birth-year-chain",
    name: "Custom Chain with Birth Year",
    price: 349,
    category: "jewelry",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
    short: "Wear your year in style.",
    customizable: ["yearText", "metalColor"],
  },

  // =========================
  // BEAUTY (confirmed from price list: lash mirror; plus your list items)
  // =========================
  {
    id: "custom-lash-mirror",
    name: "Custom Lash Mirror",
    price: 220, // price list shows R220 :contentReference[oaicite:10]{index=10}
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    short: "Mirror customized with your name/business.",
    customizable: ["nameText", "caseColor"],
  },
  {
    id: "lash-brush",
    name: "Lash Brush",
    price: 49,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&q=80",
    short: "Clean lashes, always.",
    customizable: [],
  },
  {
    id: "custom-nail-bow-design",
    name: "Custom Nail Bow Design",
    price: 199,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=1200&q=80",
    short: "Bows on nails? Say less.",
    customizable: ["noteText"],
  },
  {
    id: "heart-shape-nail-cushion",
    name: "Heart Shape & Nail Cushion",
    price: 199,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1612810436541-336f9f0b98df?auto=format&fit=crop&w=1200&q=80",
    short: "Cute + comfy nail setup.",
    customizable: ["noteText"],
  },

  // =========================
  // FAITH (your list)
  // =========================
  {
    id: "jesus-sticker",
    name: "Jesus Sticker",
    price: 39,
    category: "faith",
    image:
      "https://images.unsplash.com/photo-1454922915609-78549ad709bb?auto=format&fit=crop&w=1200&q=80",
    short: "Faith, but make it aesthetic.",
    customizable: ["noteText"],
  },
  {
    id: "prayer-decoration",
    name: "Prayer Decoration",
    price: 189,
    category: "faith",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    short: "A gentle reminder daily.",
    customizable: ["verseText"],
  },

  // =========================
  // PHONE (confirmed in bio: phone light; plus your case item)
  // =========================
  {
    id: "phone-light",
    name: "Phone Light",
    price: 129, // bio mentions phone light :contentReference[oaicite:11]{index=11}
    category: "phone",
    image:
      "https://images.unsplash.com/photo-1519181245277-cffeb31da2fb?auto=format&fit=crop&w=1200&q=80",
    short: "Mini phone fill light for content.",
    customizable: ["noteText"],
  },
  {
    id: "phone-case-hearts-verses",
    name: "Phone Case (Hearts + Bible Verse)",
    price: 279,
    category: "phone",
    image:
      "https://images.unsplash.com/photo-1583225214464-9296029427aa?auto=format&fit=crop&w=1200&q=80",
    short: "Hearts + your favorite verse.",
    customizable: ["phoneModel", "verseText", "caseColor"],
  },
];