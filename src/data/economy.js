// economy.js keeps every Moolah amount in one place, so they are easy to tune.
// Moolah is only ever earned by helping. It can't be bought, and donating never earns it.

// Moolah for going to a session, by how many times the student has been to that
// cause before: first visit, second visit, third visit or later.
export const SESSION_MOOLAH = [10, 15, 20]

// Moolah for writing a diary entry after a session.
export const REFLECTION_MOOLAH = 5

// Hours counted for one session when the session doesn't say how long it lasts.
export const DEFAULT_SESSION_HOURS = 2

// Moolah for a visit, given how many earlier visits to the same cause there were.
export function visitMoolah(earlierVisits) {
    return SESSION_MOOLAH[Math.min(earlierVisits, SESSION_MOOLAH.length - 1)]
}

// Hours for one session: its own length if it has one, otherwise the default.
export function sessionHours(session) {
    return session && session.durationMinutes ? session.durationMinutes / 60 : DEFAULT_SESSION_HOURS
}
