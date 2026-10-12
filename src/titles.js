// titles.js works out which titles the student has earned from their history.
// Titles are never stored: they are recalculated each time, so they always
// match the history. Once earned, a title is kept; there are no levels or rankings.
//
// A history item looks like { type, causeId, at } and, for sign-ups, also { weekly, mode }.

export const TITLES = [
    { id: "first-step", name: "First Step", description: "Took your first action" },
    { id: "word-spreader", name: "Word Spreader", description: "Shared a cause" },
    { id: "team-player", name: "Team Player", description: "Signed up with friends or a relay group" },
    { id: "regular", name: "Regular", description: "Signed up weekly, or reflected on the same cause twice" },
    { id: "storyteller", name: "Storyteller", description: "Wrote your first diary entry" },
]

// Which titles one history item earns, given the reflection counts so far.
function titlesFor(item, reflectionsByCause) {
    const earned = ["first-step"]
    if (item.type === "share") {
        earned.push("word-spreader")
    }
    if (item.type === "signup" && item.mode !== "me") {
        earned.push("team-player")
    }
    if (item.type === "signup" && item.weekly) {
        earned.push("regular")
    }
    if (item.type === "reflection") {
        earned.push("storyteller")
        if (reflectionsByCause[item.causeId] >= 2) {
            earned.push("regular")
        }
    }
    return earned
}

// Returns the earned titles in the order they were earned, so the last one is the latest.
export function earnedTitles(history) {
    const earnedIds = []
    const reflectionsByCause = {}

    history.forEach((item) => {
        if (item.type === "reflection") {
            reflectionsByCause[item.causeId] = (reflectionsByCause[item.causeId] || 0) + 1
        }
        titlesFor(item, reflectionsByCause).forEach((id) => {
            if (!earnedIds.includes(id)) {
                earnedIds.push(id)
            }
        })
    })

    return earnedIds.map((id) => TITLES.find((title) => title.id === id))
}
