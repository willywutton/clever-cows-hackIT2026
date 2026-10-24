// upcoming.js lists the student's upcoming sign-ups, soonest first.
import { causes } from './data/causes'

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

function lastSession({ entry, signup }) {
    const first = new Date(signup.startsAt)
    if (!entry.weekly) {
        return first
    }
    return entry.weeks ? new Date(first.getTime() + (entry.weeks - 1) * WEEK_MS) : new Date(8640000000000000)
}

// Turns App's signedUp list into { entry, cause, signup } items, soonest first.
// Sessions that have already started are left out, unless the sign-up repeats and
// its last week is still ahead (a weekly one with no set number of weeks keeps going).
export function upcomingSessions(signedUp, now = new Date()) {
    return signedUp
        .map((entry) => {
            const cause = causes.find((c) => c.id === entry.causeId)
            const signup = cause.actions.find((action) => action.type === "signup")
            return { entry, cause, signup }
        })
        .filter((item) => lastSession(item) > now)
        .sort((a, b) => new Date(a.signup.startsAt) - new Date(b.signup.startsAt))
}

// The student's own events that an organisation approved and that haven't happened yet, soonest first.
export function hostedUpcoming(events, now = new Date()) {
    return events
        .filter((event) => event.source === "student" && event.status === "approved" && new Date(event.startsAt) > now)
        .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))
}
