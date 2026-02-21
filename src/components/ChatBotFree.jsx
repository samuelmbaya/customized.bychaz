import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BowIcon from "./BowIcon.jsx";
import { products, categories } from "../data/products.jsx";
import { moneyZAR } from "../utils/money.js";

const WA_NUMBER = "27843146711"; // replace (no +)

function waLink(text) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

const norm = (s) => String(s || "").toLowerCase().trim();

const SITE_ONLY_REPLY =
  "I’m afraid that’s not of my concern 💗 I only help with Bow Boutique products, pricing, customization, and ordering.";

const DEFAULT_TURNAROUND =
  "Most customs take about 3–5 working days (depending on the item). We confirm timing on WhatsApp 💗";

const DEFAULT_DELIVERY =
  "Delivery/collection is arranged on WhatsApp. Share your area and we’ll confirm options 💗";

// simple synonyms to make matching better
const SYNONYMS = [
  ["necklace", "chain"],
  ["nameplate", "name chain"],
  ["mirror", "lash mirror"],
  ["lashes", "lash"],
  ["sign", "name sign"],
  ["decoration", "name decoration"],
  ["phone cover", "phone case"],
  ["cover", "phone case"],
  ["verse", "bible verse"],
  ["jesus", "sticker"],
  ["pray", "prayer"],
];

function applySynonyms(text) {
  let t = norm(text);
  for (const [a, b] of SYNONYMS) {
    t = t.replaceAll(a, b);
  }
  return t;
}

// Detect non-site queries (lightweight heuristic)
function looksNonSiteRelated(text) {
  const t = norm(text);

  // If it clearly asks for coding/help unrelated to shop
  const nonSiteHints = [
    "solve",
    "homework",
    "math",
    "code",
    "javascript",
    "react",
    "mongodb",
    "atlas",
    "politics",
    "news",
    "weather",
    "sports",
    "music",
    "relationship",
    "girlfriend",
    "boyfriend",
    "job",
    "cv",
    "resume",
    "essay",
    "instagram hack",
    "download",
  ];

  const siteHints = [
    "shop",
    "product",
    "price",
    "cost",
    "custom",
    "order",
    "delivery",
    "collect",
    "turnaround",
    "whatsapp",
    "instagram",
    "chain",
    "bracelet",
    "neon",
    "sign",
    "mirror",
    "phone case",
    "sticker",
    "prayer",
    "lamp",
    "lash",
    "nail",
    "decor",
    "jewelry",
    "beauty",
    "faith",
    "phone",
    "bible",
    "verse",
  ];

  const hasSiteHint = siteHints.some((k) => t.includes(k));
  const hasNonSiteHint = nonSiteHints.some((k) => t.includes(k));

  // If it contains strong non-site hints and no site hints, treat as out-of-scope
  return hasNonSiteHint && !hasSiteHint;
}

export default function ChatBotFree() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi babes 💗 I’m Chaz’s helper. Ask me about products, prices, customization, delivery or ordering.",
      quick: ["What do you sell?", "Show categories", "Prices", "Turnaround", "Delivery", "Order on WhatsApp"],
    },
  ]);

  const nav = useNavigate();
  const listRef = useRef(null);

  const productIndex = useMemo(() => {
    return products.map((p) => ({
      ...p,
      key: applySynonyms(`${p.name} ${p.short} ${p.category} ${p.id}`),
    }));
  }, []);

  const categorySet = useMemo(() => new Set(categories.map((c) => c.id)), []);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const pushUser = (text) => setMessages((m) => [...m, { role: "user", text }]);
  const pushBot = (text, quick) => setMessages((m) => [...m, { role: "bot", text, quick }]);

  function listByCategory(catId) {
    return products.filter((p) => p.category === catId);
  }

  function findProducts(query) {
    const q = applySynonyms(query);
    if (!q) return [];

    // if they typed a category name/id
    const cat = categories.find((c) => norm(c.label) === q || c.id === q);
    if (cat && cat.id !== "all") return listByCategory(cat.id).slice(0, 6);

    // keyword match
    const hits = productIndex
      .filter((p) => p.key.includes(q))
      .slice(0, 6);

    return hits;
  }

  function findBestSingleProduct(query) {
    const hits = findProducts(query);
    return hits[0] || null;
  }

  function replyCatalogOverview() {
    const lines = categories
      .filter((c) => c.id !== "all")
      .map((c) => {
        const count = listByCategory(c.id).length;
        return `• ${c.label} (${count})`;
      })
      .join("\n");

    pushBot(
      `Here’s what Bow Boutique offers:\n${lines}\n\nTell me a category (like “Decor”) or a product (like “neon”).`,
      ["Show Decor", "Show Jewelry", "Show Beauty", "Show Faith", "Show Phone", "Open Shop"]
    );
  }

  function replyWhatWeSell() {
    const topExamples = {
      jewelry: "Custom name chains, name bracelets, birth-year chains",
      decor: "Custom name decorations/signs, acrylic door signs, neon lights, sunset lamp",
      beauty: "Custom lash mirrors, lash brush, nail bow designs, nail cushion",
      faith: "Jesus sticker, prayer decoration",
      phone: "Phone light, phone cases (hearts + Bible verse)",
    };

    pushBot(
      `We do custom, cute & faith-inspired items 💗\n\n` +
        `Jewelry: ${topExamples.jewelry}\n` +
        `Decor: ${topExamples.decor}\n` +
        `Beauty: ${topExamples.beauty}\n` +
        `Faith: ${topExamples.faith}\n` +
        `Phone: ${topExamples.phone}\n\n` +
        `What do you want today?`,
      ["Neon light", "Name chain", "Name sign", "Lash mirror", "Phone case"]
    );
  }

  function replyPrices(query) {
    const p = findBestSingleProduct(query);
    if (!p) {
      pushBot(
        "Tell me the product name and I’ll give the price (e.g. “lash mirror price” or “neon price”).",
        ["Neon price", "Name chain price", "Lash mirror price", "Open Shop"]
      );
      return;
    }
    pushBot(
      `✅ ${p.name} is ${moneyZAR(p.price)}.\nWant to view it or order on WhatsApp?`,
      [`View: ${p.id}`, "Order on WhatsApp"]
    );
  }

  function replyCustomization(query) {
    const p = findBestSingleProduct(query);
    if (!p) {
      pushBot(
        "Which product do you want to customize? Tell me like: “customize neon” or “customize name chain”.",
        ["Customize neon", "Customize name chain", "Customize phone case"]
      );
      return;
    }

    const keys = p.customizable || [];
    if (!keys.length) {
      pushBot(`✅ ${p.name} doesn’t need customization. Want to view it?`, [`View: ${p.id}`]);
      return;
    }

    const nice = {
      nameText: "Name text",
      yearText: "Birth year",
      verseText: "Bible verse",
      phoneModel: "Phone model",
      metalColor: "Metal color",
      fontStyle: "Font style",
      neonColor: "Neon color",
      caseColor: "Case color",
      noteText: "Notes",
    };

    const list = keys.map((k) => `• ${nice[k] || k}`).join("\n");

    pushBot(
      `For **${p.name}**, we need:\n${list}\n\nWant to view it or order on WhatsApp?`,
      [`View: ${p.id}`, "Order on WhatsApp"]
    );
  }

  function replyOrderHelp(query) {
    const p = findBestSingleProduct(query);
    if (!p) {
      pushBot(
        "Tell me what you want to order (e.g. “order neon light”, “order name chain”).",
        ["Order neon light", "Order name chain", "Order phone case"]
      );
      return;
    }

    const keys = p.customizable || [];
    const mustHave = ["nameText", "yearText", "verseText", "phoneModel"];

    const required = keys.filter((k) => mustHave.includes(k));
    const optional = keys.filter((k) => !mustHave.includes(k));

    const nice = {
      nameText: "Name",
      yearText: "Birth year",
      verseText: "Bible verse",
      phoneModel: "Phone model",
      metalColor: "Metal color",
      fontStyle: "Font style",
      neonColor: "Neon color",
      caseColor: "Case color",
      noteText: "Notes",
    };

    const reqLine = required.length ? required.map((k) => nice[k] || k).join(", ") : "No required fields";
    const optLine = optional.length ? optional.map((k) => nice[k] || k).join(", ") : "None";

    const msg =
      `Hi 💗 I want to order: ${p.name}\n` +
      `Price: ${moneyZAR(p.price)}\n\n` +
      `My details:\n` +
      (required.length ? required.map((k) => `${nice[k] || k}:`).join("\n") : "") +
      (optional.length ? `\n\nOptional:\n${optional.map((k) => `${nice[k] || k}:`).join("\n")}` : "") +
      `\n\nPlease confirm turnaround + delivery. Thank you!`;

    pushBot(
      `Perfect 💗 For **${p.name}**:\nRequired: ${reqLine}\nOptional: ${optLine}\n\nTap below to WhatsApp (pre-filled message).`,
      ["Send order on WhatsApp", `View: ${p.id}`]
    );

    // store the message on the last bot message object via closure state
    setLastWhatsApp(msg);
  }

  const [lastWhatsApp, setLastWhatsApp] = useState("");

  function handle(text) {
    const raw = String(text || "").trim();
    const t = applySynonyms(raw);

    // hard scope rule
    if (looksNonSiteRelated(t)) {
      pushBot(SITE_ONLY_REPLY, ["What do you sell?", "Show categories", "Open Shop"]);
      return;
    }

    // General “scope guard”: if they ask something totally random with no match and no site hint
    const siteHints = [
      "shop","product","price","cost","custom","order","delivery","collect","turnaround","whatsapp","instagram",
      "chain","bracelet","neon","sign","mirror","case","sticker","prayer","lamp","lash","nail",
      "decor","jewelry","beauty","faith","phone","bible","verse",
    ];
    const hasSiteHint = siteHints.some((k) => t.includes(k));

    // explicit commands / intents
    if (t === "what do you sell" || t.includes("what do you sell") || t.includes("what do you have") || t.includes("what do you offer")) {
      replyWhatWeSell();
      return;
    }

    if (t.includes("category") || t.includes("categories")) {
      replyCatalogOverview();
      return;
    }

    if (t.includes("turnaround") || t.includes("how long") || t.includes("days") || t.includes("when ready")) {
      pushBot(DEFAULT_TURNAROUND, ["Order on WhatsApp", "Open Shop"]);
      return;
    }

    if (t.includes("delivery") || t.includes("collect") || t.includes("collection")) {
      pushBot(DEFAULT_DELIVERY, ["Order on WhatsApp", "Open Shop"]);
      return;
    }

    if (t.includes("instagram")) {
      pushBot("You can view our Instagram here:", ["Visit Instagram"]);
      return;
    }

    if (t.includes("whatsapp") && !t.includes("price")) {
      pushBot("Tap below to WhatsApp Chaz 💗", ["Order on WhatsApp"]);
      return;
    }

    // Price intent
    if (t.includes("price") || t.includes("cost") || t.includes("how much")) {
      replyPrices(t.replace("price", "").replace("cost", "").replace("how much", "").trim());
      return;
    }

    // Customize intent
    if (t.includes("customize") || t.includes("customise")) {
      replyCustomization(t.replace("customize", "").replace("customise", "").trim());
      return;
    }

    // Order intent
    if (t.includes("order")) {
      replyOrderHelp(t.replace("order", "").trim());
      return;
    }

    // Category quicks
    if (t.startsWith("show ")) {
      const maybe = t.replace("show ", "").trim();
      if (categorySet.has(maybe)) {
        const items = listByCategory(maybe).slice(0, 6);
        pushBot(
          `Here are some ${maybe} items:`,
          items.map((p) => `View: ${p.id}`).concat(["Open Shop"])
        );
        return;
      }
      const cat2 = categories.find((c) => norm(c.label) === maybe);
      if (cat2 && cat2.id !== "all") {
        const items = listByCategory(cat2.id).slice(0, 6);
        pushBot(
          `Here are some ${cat2.label} items:`,
          items.map((p) => `View: ${p.id}`).concat(["Open Shop"])
        );
        return;
      }
    }

    // Product search fallback
    const hits = findProducts(t);
    if (hits.length) {
      pushBot(
        "I found these that match — want to view one?",
        hits.map((p) => `View: ${p.id}`).concat(["Open Shop"])
      );
      return;
    }

    // If message contains no site hints and no matches -> out of scope message
    if (!hasSiteHint) {
      pushBot(SITE_ONLY_REPLY, ["What do you sell?", "Show categories", "Open Shop"]);
      return;
    }

    // Otherwise: helpful site fallback
    pushBot(
      "I can help with products, prices, customization and ordering 💗 Try: “neon price”, “show decor”, or “order lash mirror”.",
      ["What do you sell?", "Show categories", "Open Shop", "Order on WhatsApp"]
    );
  }

  function send(textRaw) {
    const text = String(textRaw || "").trim();
    if (!text) return;
    pushUser(text);
    handle(text);
    setInput("");
  }

  function quickAction(q) {
    if (q === "Open Shop") return nav("/shop");

    if (q === "Prices") return send("prices");
    if (q === "Turnaround") return send("turnaround");
    if (q === "Delivery") return send("delivery");

    if (q === "Show categories") return send("show categories");
    if (q === "What do you sell?") return send("what do you sell");

    if (q === "Show Decor") return send("show decor");
    if (q === "Show Jewelry") return send("show jewelry");
    if (q === "Show Beauty") return send("show beauty");
    if (q === "Show Faith") return send("show faith");
    if (q === "Show Phone") return send("show phone");

    if (q === "Visit Instagram") {
      window.open("https://www.instagram.com/customized.bychaz/", "_blank");
      return;
    }

    if (q === "Order on WhatsApp") {
      window.open(waLink("Hi 💗 I want to place an order. Can you help me?"), "_blank");
      return;
    }

    if (q === "Send order on WhatsApp") {
      const msg = lastWhatsApp || "Hi 💗 I want to place an order. Can you help me?";
      window.open(waLink(msg), "_blank");
      return;
    }

    if (q.startsWith("View: ")) {
      const id = q.replace("View: ", "").trim();
      nav(`/product/${id}`);
      return;
    }

    // Treat anything else as a message
    send(q);
  }

  return (
    <>
      {/* Bubble */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed z-50 bottom-6 left-6 w-14 h-14 rounded-full bg-blush-600 text-white shadow-glow hover:brightness-105 transition flex items-center justify-center"
        aria-label="Open chat"
        title="Chat"
      >
        <BowIcon className="w-7 h-7" />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed z-50 bottom-24 left-6 w-[360px] max-w-[calc(100vw-24px)] bg-white/80 backdrop-blur border border-blush-100 rounded-3xl shadow-soft overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between border-b border-blush-100 bg-white/70">
            <div>
              <div className="font-display text-lg text-blush-900">Chaz Helper</div>
              <div className="text-xs text-ink/60 -mt-1">site-only assistant</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-blush-100 border border-blush-200 px-3 py-1 text-sm font-semibold text-blush-800"
            >
              Close
            </button>
          </div>

          <div ref={listRef} className="max-h-[380px] overflow-auto p-4 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={[
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border whitespace-pre-line",
                    m.role === "user"
                      ? "bg-blush-600 text-white border-blush-600"
                      : "bg-white/70 text-ink/80 border-blush-100",
                  ].join(" ")}
                >
                  {m.text}

                  {m.quick?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.quick.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => quickAction(q)}
                          className="text-xs font-semibold rounded-full bg-blush-100 border border-blush-200 px-3 py-1 text-blush-800 hover:bg-white transition"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-blush-100 bg-white/70">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                className="flex-1 rounded-2xl bg-white/70 border border-blush-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blush-300"
                placeholder='Try: "neon price", "show decor", "order lash mirror"'
              />
              <button
                type="button"
                onClick={() => send(input)}
                className="rounded-2xl bg-blush-600 text-white px-4 py-3 text-sm font-semibold shadow-glow hover:brightness-105 transition"
              >
                Send
              </button>
            </div>

            <div className="mt-2 text-[11px] text-ink/55">
              Tip: For exact quotes and delivery, WhatsApp is best.
            </div>
          </div>
        </div>
      )}
    </>
  );
}