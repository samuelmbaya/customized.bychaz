import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BowIcon from "./BowIcon.jsx";
import { products } from "../data/products.jsx";

const WA_NUMBER = "27XXXXXXXXX"; // replace (no +)

function waLink(text) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
const norm = (s) => String(s || "").toLowerCase().trim();

const FAQ = [
  {
    keys: ["turnaround", "how long", "days", "when ready"],
    answer:
      "Most customs take about 3–5 working days (depending on the item). We confirm timing on WhatsApp 💗",
  },
  {
    keys: ["delivery", "collect", "collection", "ship"],
    answer:
      "Delivery/collection is arranged on WhatsApp. Share your area and we’ll confirm options 💗",
  },
  {
    keys: ["price", "cost", "how much"],
    answer:
      "Prices depend on the item + customization. Browse the shop or WhatsApp for an exact quote 💗",
  },
  {
    keys: ["payment", "pay", "eft", "cash"],
    answer:
      "Payment details are shared on WhatsApp once your order is confirmed 💗",
  },
];

const FLOWS = {
  "custom name chain": {
    title: "Custom Name Chain",
    fields: [
      { key: "name", q: "What name should we use?" },
      { key: "metal", q: "Metal color? (Gold / Silver / Rose Gold)" },
      { key: "font", q: "Font style? (Elegant / Classic / Bold / Soft Script)" },
      { key: "notes", q: "Any notes? (optional)" },
    ],
  },
  "custom neon light": {
    title: "Custom Neon Light",
    fields: [
      { key: "text", q: "What text should the neon say?" },
      { key: "color", q: "Neon color? (Hot Pink / Soft Pink / White / Purple / Blue)" },
      { key: "notes", q: "Size/shape notes? (optional)" },
    ],
  },
  "custom name sign": {
    title: "Custom Name Sign / Decoration",
    fields: [
      { key: "name", q: "What name should the sign say?" },
      { key: "colors", q: "What colors do you want? (e.g. Pink + White)" },
      { key: "notes", q: "Door sign / round sign / toy box? Any notes? (optional)" },
    ],
  },
  "custom lash mirror": {
    title: "Custom Lash Mirror",
    fields: [
      { key: "name", q: "What name should go on the mirror?" },
      { key: "color", q: "Mirror color? (Pink / White / Clear)" },
      { key: "notes", q: "Any notes? (optional)" },
    ],
  },
  "phone case": {
    title: "Phone Case (Hearts + Bible Verse)",
    fields: [
      { key: "model", q: "What phone model? (e.g. iPhone 13 / Samsung A54)" },
      { key: "verse", q: "Which Bible verse should we print?" },
      { key: "color", q: "Case color? (Pink / White / Clear)" },
      { key: "notes", q: "Any notes? (optional)" },
    ],
  },
};

function bestFlow(text) {
  const t = norm(text);
  if (t.includes("chain") || t.includes("bracelet")) return "custom name chain";
  if (t.includes("neon")) return "custom neon light";
  if (t.includes("sign") || t.includes("decoration") || t.includes("door")) return "custom name sign";
  if (t.includes("mirror") || t.includes("lash")) return "custom lash mirror";
  if (t.includes("phone case") || t.includes("case")) return "phone case";
  return null;
}

export default function ChatBotFree() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi babes 💗 I’m Chaz’s helper. What are we customizing today?",
      quick: ["Name chain", "Neon light", "Name sign", "Lash mirror", "Phone case", "Turnaround", "Delivery"],
    },
  ]);

  const [flow, setFlow] = useState(null); // flow key
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const nav = useNavigate();
  const listRef = useRef(null);

  const index = useMemo(
    () =>
      products.map((p) => ({
        ...p,
        key: norm(`${p.name} ${p.short} ${p.category} ${p.id}`),
      })),
    []
  );

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const pushUser = (text) => setMessages((m) => [...m, { role: "user", text }]);
  const pushBot = (text, quick) => setMessages((m) => [...m, { role: "bot", text, quick }]);

  function suggestProducts(q) {
    const nq = norm(q);
    return index.filter((p) => p.key.includes(nq)).slice(0, 4);
  }

  function startFlow(flowKey) {
    setFlow(flowKey);
    setStep(0);
    setAnswers({});
    pushBot(`Perfect 💗 Let’s do: ${FLOWS[flowKey].title}`, ["Cancel"]);
    pushBot(FLOWS[flowKey].fields[0].q);
  }

  function cancelFlow() {
    setFlow(null);
    setStep(0);
    setAnswers({});
    pushBot("No stress 💗 What do you want to do next?", [
      "Name chain",
      "Neon light",
      "Name sign",
      "Lash mirror",
      "Phone case",
      "Open Shop",
      "WhatsApp order",
    ]);
  }

  function finishFlow(flowKey, finalAnswers) {
    const title = FLOWS[flowKey].title;
    const lines = Object.entries(finalAnswers)
      .filter(([_, v]) => String(v || "").trim())
      .map(([k, v]) => `${k}: ${v}`);

    const msg = `Hi 💗 I want to order: ${title}\n${lines.join("\n")}\n\nTurnaround: please confirm.\nThank you!`;
    pushBot("Done ✅ Tap below to send your order on WhatsApp (pre-filled).", ["Send on WhatsApp", "Open Shop"]);
    setAnswers((a) => ({ ...a, _wa: msg }));
    setFlow(null);
    setStep(0);
  }

  function handleFaq(text) {
    const t = norm(text);
    for (const item of FAQ) {
      if (item.keys.some((k) => t.includes(k))) {
        pushBot(item.answer, ["Open Shop", "WhatsApp order"]);
        return true;
      }
    }
    return false;
  }

  function handle(text) {
    const t = String(text || "").trim();
    if (!t) return;

    // If we are in a flow, use the input as the answer
    if (flow) {
      const f = FLOWS[flow];
      const current = f.fields[step];
      const nextAnswers = { ...answers, [current.key]: t };
      setAnswers(nextAnswers);

      const nextStep = step + 1;
      if (nextStep >= f.fields.length) {
        finishFlow(flow, nextAnswers);
      } else {
        setStep(nextStep);
        pushBot(f.fields[nextStep].q, ["Cancel"]);
      }
      return;
    }

    // FAQ
    if (handleFaq(t)) return;

    // Start a flow if user indicates a product
    const fk = bestFlow(t);
    if (fk) {
      startFlow(fk);
      return;
    }

    // Product suggestions
    const hits = suggestProducts(t);
    if (hits.length) {
      pushBot("I found these that match — choose one:", hits.map((p) => `View: ${p.id}`));
      return;
    }

    // Default
    pushBot(
      "Tell me what you want (e.g. neon / name chain / lash mirror / phone case) or ask about delivery/turnaround 💗",
      ["Open Shop", "WhatsApp order"]
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
    if (q === "Cancel") return cancelFlow();

    if (q === "WhatsApp order") {
      window.open(waLink("Hi 💗 I want to place an order. Can you help me?"), "_blank");
      return;
    }

    if (q === "Send on WhatsApp") {
      const msg = answers._wa || "Hi 💗 I want to place an order. Can you help me?";
      window.open(waLink(msg), "_blank");
      return;
    }

    // Start flows
    if (q === "Name chain") return startFlow("custom name chain");
    if (q === "Neon light") return startFlow("custom neon light");
    if (q === "Name sign") return startFlow("custom name sign");
    if (q === "Lash mirror") return startFlow("custom lash mirror");
    if (q === "Phone case") return startFlow("phone case");

    // FAQ quicks
    if (q === "Turnaround") return send("turnaround");
    if (q === "Delivery") return send("delivery");

    // View product
    if (q.startsWith("View: ")) {
      const id = q.replace("View: ", "").trim();
      nav(`/product/${id}`);
      return;
    }

    send(q);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed z-50 bottom-6 left-6 w-14 h-14 rounded-full bg-blush-600 text-white shadow-glow hover:brightness-105 transition flex items-center justify-center"
        aria-label="Open chat"
        title="Chat"
      >
        <BowIcon className="w-7 h-7" />
      </button>

      {open && (
        <div className="fixed z-50 bottom-24 left-6 w-[340px] max-w-[calc(100vw-24px)] bg-white/80 backdrop-blur border border-blush-100 rounded-3xl shadow-soft overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between border-b border-blush-100 bg-white/70">
            <div>
              <div className="font-display text-lg text-blush-900">Chaz Helper</div>
              <div className="text-xs text-ink/60 -mt-1">smart order assistant</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-blush-100 border border-blush-200 px-3 py-1 text-sm font-semibold text-blush-800"
            >
              Close
            </button>
          </div>

          <div ref={listRef} className="max-h-[360px] overflow-auto p-4 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={[
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border",
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
                placeholder="Type here…"
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
              Tip: For exact quotes, WhatsApp is best.
            </div>
          </div>
        </div>
      )}
    </>
  );
}