// upcoming.js lists the student's upcoming sign-ups, soonest first.
import { causes } from './data/causes'

// Turns App's signedUp list into { entry, cause, signup } items, soonest first.
// One-off sessions that have already started are left out; weekly ones keep going.
export function upcomingSessions(signedUp, now = new Date()) {
    return signedUp
        .map((entry) => {
            const cause = causes.find((c) => c.id === entry.causeId)
            const signup = cause.actions.find((action) => action.type === "signup")
            return { entry, cause, signup }
        })
        .filter((item) => item.entry.weekly || new Date(item.signup.startsAt) > now)
        .sort((a, b) => new Date(a.signup.startsAt) - new Date(b.signup.startsAt))
}

// The student's own events that an organisation approved and that haven't happened yet, soonest first.
export function hostedUpcoming(events, now = new Date()) {
    return events
        .filter((event) => event.source === "student" && event.status === "approved" && new Date(event.startsAt) > now)
        .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))
}
