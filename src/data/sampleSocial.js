// Sample content for the Social tab: public diary pages from sample friends,
// canned chat replies, and one sample invite. All of it is made up and is
// labelled "Sample" on screen. Like counts here are sample numbers, not real ones.

export const samplePublicEntries = [
  { id: "sample_entry_1", authorId: "friend_03", causeId: "cause_01", at: "2026-10-12T11:00:00+08:00",
    message: "Walked three dogs today. Biscuit finally let me pet him!", stickers: ["cow", "star"], likes: 18 },
  { id: "sample_entry_2", authorId: "friend_01", causeId: "cause_02", at: "2026-10-10T16:00:00+08:00",
    message: "Played chess with Mr Tan. He won both games and told me about the old kampong.", stickers: ["heart"], likes: 12 },
  { id: "sample_entry_3", authorId: "friend_06", causeId: "cause_05", at: "2026-10-08T10:30:00+08:00",
    message: "Muddy shoes, happy heart. The riverbank looks so much better.", stickers: ["clover", "hands"], likes: 9 },
  { id: "sample_entry_4", authorId: "friend_04", causeId: "cause_07", at: "2026-10-06T15:00:00+08:00",
    message: "Filmed my first interview for Storyline. Nervous but fun.", stickers: ["sun"], likes: 7 },
  { id: "sample_entry_5", authorId: "friend_07", causeId: "cause_08", at: "2026-10-04T17:45:00+08:00",
    message: "Helped a younger student with fractions. We both get it now!", stickers: ["rainbow"], likes: 5 },
]

// Friendly replies a sample friend sends back in chat, used in turn.
export const sampleChatReplies = [
  "Haha nice! Are you going this weekend?",
  "Count me in! What time should we meet?",
  "That sounds fun. Let me check my timetable.",
  "Yay! Clover Cowdini would approve 🐮",
  "Sure! I'll bring snacks.",
]

// An invite from a sample friend, so the Invites list isn't empty on first open.
export const sampleIncomingInvites = [
  { id: "sample_invite_1", fromId: "friend_01", causeId: "cause_05",
    note: "Riverbank clean-up this Sunday, come with me?" },
]
