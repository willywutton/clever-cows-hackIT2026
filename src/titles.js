// titles.js works out which titles the student has earned from their history.
// Titles are never stored: they are recalculated each time, so they always
// match the history. Once earned, a title is kept; there are no levels or rankings.
//
// A history item looks like { type, causeId, at } and, for sign-ups, also { weekly, mode }.
// A goalHistory item looks like { goalId, finishedAt }, one for each goal the student finished.
import { goals } from './data/goals'

export const TITLES = [
    { id: "first-step", name: "First Step", description: "Took your first action" },
    { id: "word-spreader", name: "Word Spreader", description: "Shared a cause" },
    { id: "explorer", name: "Explorer", description: "Finished the goal Try something new" },
    { id: "regular", name: "Regular", description: "Finished the goal Help regularly" },
    { id: "connector", name: "Connector", description: "Finished the goal Meet new people" },
    { id: "champion", name: "Champion", description: "Finished the goal Go deeper in one cause" },
    { id: "storyteller", name: "Storyteller", description: "Finished the goal Share my story" },
]

// Which automatic titles one history item earns.
function titlesFor(item) {
    const earned = ["first-step"]
    if (item.type === "share") {
        earned.push("word-spreader")
    }
    return earned
}

// Returns the earned titles in the order they were earned, so the last one is the latest.
// Automatic titles come from the history; goal titles come only from finished goals.
export function earnedTitles(history, goalHistory = []) {
    const events = []

    history.forEach((item) => {
        titlesFor(item).forEach((id) => events.push({ id, at: item.at }))
    })
    goalHistory.forEach((finished) => {
        const goal = goals.find((g) => g.id === finished.goalId)
        if (goal) {
            events.push({ id: goal.titleId, at: finished.finishedAt })
        }
    })

    // ISO times sort correctly as text. The sort keeps equal times in their original order.
    events.sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0))

    const earnedIds = []
    events.forEach((event) => {
        if (!earnedIds.includes(event.id)) {
            earnedIds.push(event.id)
        }
    })

    return earnedIds.map((id) => TITLES.find((title) => title.id === id))
}
