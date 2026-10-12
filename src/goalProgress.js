// goalProgress.js has small helpers for reading a goal's progress from the history.
// Nothing here is stored: progress is recalculated each time it is shown.
import { goals } from './data/goals'

// Finds a goal by its id, or returns null if there is no such goal.
export function goalById(id) {
    return goals.find((goal) => goal.id === id) || null
}

// Returns { done, target, complete } for a goal. done never goes above the target.
export function goalProgress(goal, history) {
    const done = Math.min(goal.count(history), goal.target)
    return { done, target: goal.target, complete: done >= goal.target }
}

// A short progress line, e.g. "1 of 3 causes".
export function progressText(goal, history) {
    const { done, target } = goalProgress(goal, history)
    return `${done} of ${target} ${goal.unit}`
}
