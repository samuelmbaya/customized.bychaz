export function buildWhatsAppUrl({ phoneE164, message }) {
  // phoneE164 example: "27XXXXXXXXX" (South Africa)
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneE164}?text=${encoded}`;
}

export function buildOrderMessage({ shopName, items, subtotal }) {
  const lines = [];
  lines.push(`Hi! I’d like to place an order from ${shopName} 💗`);
  lines.push("");
  items.forEach((item, i) => {
    lines.push(`${i + 1}) ${item.name} x${item.qty}`);
    if (item.customization && Object.keys(item.customization).length > 0) {
      Object.entries(item.customization).forEach(([k, v]) => {
        if (v && String(v).trim().length > 0) lines.push(`   - ${labelize(k)}: ${v}`);
      });
    }
    lines.push("");
  });
  lines.push(`Subtotal: ${subtotal}`);
  lines.push("");
  lines.push("Delivery/Collection details:");
  lines.push("- Name:");
  lines.push("- Area:");
  lines.push("- Preferred date:");
  return lines.join("\n");
}

function labelize(key) {
  const map = {
    nameText: "Name",
    yearText: "Year",
    verseText: "Bible verse",
    phoneModel: "Phone model",
    metalColor: "Metal color",
    fontStyle: "Font style",
    neonColor: "Neon color",
    caseColor: "Case color",
    noteText: "Notes",
  };
  return map[key] || key;
}