// causeColors.js gives every cause its own colour and emoji, so causes are easy
// to tell apart at a glance. Colours are soft enough for dark text on top.

const LOOKS = {
    cause_01: { color: "#f4c7a1", emoji: "🐕" },
    cause_02: { color: "#e9c6e0", emoji: "♟️" },
    cause_03: { color: "#c9d8e8", emoji: "🔧" },
    cause_04: { color: "#cfe3c6", emoji: "📱" },
    cause_05: { color: "#bfe0dc", emoji: "🌊" },
    cause_06: { color: "#f6dc9a", emoji: "👋" },
    cause_07: { color: "#e6d1bd", emoji: "🎬" },
    cause_08: { color: "#d6d3f0", emoji: "📚" },
    cause_09: { color: "#f2c3bd", emoji: "♿" },
}

export function causeLook(causeId) {
    return LOOKS[causeId] || { color: "#e6d5b8", emoji: "🌱" }
}
