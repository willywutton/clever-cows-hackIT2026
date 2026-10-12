// Goals a student can choose from, one at a time.
// Progress is always worked out from the history, never stored.
// Repeat clicks on the same cause count once, and donating never counts.
//
// How to read one goal:
//   id             a unique code, e.g. "try-new"
//   name           what the student sees when choosing
//   description    one line explaining the goal
//   count          a function that takes the history and returns how far along the student is
//   target         the number that finishes the goal
//   titleId        the title earned on finishing it (see titles.js)
//   unit           the word shown after the progress numbers, e.g. "1 of 3 causes"
//   suggestedNext  goal ids to offer once this one is finished, best first

// The set of different causes with at least one matching history item.
function distinctCauses(history, matches) {
    return new Set(history.filter(matches).map((item) => item.causeId))
}

// A cause's score: 1 if shared, 1 if signed up, plus 1 for each reflection on it.
function bestCauseScore(history) {
    const shared = distinctCauses(history, (item) => item.type === "share")
    const signedUp = distinctCauses(history, (item) => item.type === "signup")
    const scores = {}
    shared.forEach((causeId) => {
        scores[causeId] = (scores[causeId] || 0) + 1
    })
    signedUp.forEach((causeId) => {
        scores[causeId] = (scores[causeId] || 0) + 1
    })
    history
        .filter((item) => item.type === "reflection")
        .forEach((item) => {
            scores[item.causeId] = (scores[item.causeId] || 0) + 1
        })
    return Math.max(0, ...Object.values(scores))
}

export const goals = [
    {
        id: "try-new",
        name: "Try something new",
        description: "Take an action for three different causes.",
        count: (history) => distinctCauses(history, (item) => item.type !== "donate").size,
        target: 3,
        titleId: "explorer",
        unit: "causes",
        suggestedNext: ["regular", "people", "deeper"],
    },
    {
        id: "regular",
        name: "Help regularly",
        description: "Sign up for sessions with three different causes.",
        count: (history) => distinctCauses(history, (item) => item.type === "signup").size,
        target: 3,
        titleId: "regular",
        unit: "sessions",
        suggestedNext: ["people", "deeper", "story"],
    },
    {
        id: "people",
        name: "Meet new people",
        description: "Sign up with friends or a relay group for two different causes.",
        count: (history) => distinctCauses(history, (item) => item.type === "signup" && (item.mode === "friends" || item.mode === "relay")).size,
        target: 2,
        titleId: "connector",
        unit: "group sign-ups",
        suggestedNext: ["deeper", "story", "regular"],
    },
    {
        id: "deeper",
        name: "Go deeper in one cause",
        description: "Share, sign up and reflect on the same cause.",
        count: bestCauseScore,
        target: 3,
        titleId: "champion",
        unit: "actions on one cause",
        suggestedNext: ["story", "try-new", "regular"],
    },
    {
        id: "story",
        name: "Share my story",
        description: "Write two reflections in your diary.",
        count: (history) => history.filter((item) => item.type === "reflection").length,
        target: 2,
        titleId: "storyteller",
        unit: "reflections",
        suggestedNext: ["try-new", "people", "regular"],
    },
]
