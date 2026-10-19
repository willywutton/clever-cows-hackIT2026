// people.js holds small helpers for describing who is going to a session.
// A sign-up entry (kept in App's signedUp list) looks like:
//   { causeId, weekly, mode, friendIds, goingIds, calendarAnswered }
//   mode       'me', 'friends' or 'relay'
//   friendIds  the friends who joined (for 'friends'), or the rest of the relay group
//   goingIds   for 'relay' only: who is going this time, which may or may not include "you"
import { sampleStudents } from './data/friends'

export const YOU = "you"

export function nameOf(id) {
    if (id === YOU) {
        return "You"
    }
    return sampleStudents.find((student) => student.id === id).name
}

// ["Mei L.", "You", "Arjun P."] becomes "You, Mei L. and Arjun P." ("You" always comes first).
export function joinNames(names) {
    const ordered = names.includes("You")
        ? ["You", ...names.filter((name) => name !== "You")]
        : names
    if (ordered.length <= 1) {
        return ordered.join("")
    }
    return `${ordered.slice(0, -1).join(", ")} and ${ordered[ordered.length - 1]}`
}

export function goingIds(entry) {
    if (entry.mode === 'relay') {
        return entry.goingIds
    }
    return [YOU, ...entry.friendIds]
}

export function describeWho(entry) {
    if (entry.mode === 'me') {
        return "Just you"
    }
    const going = joinNames(goingIds(entry).map(nameOf))
    if (entry.mode === 'friends') {
        return going
    }
    return `Relay group. Going this time: ${going}`
}

// A fair suggestion for a weekly relay group's next session:
// people who sat this one out go first, then the rest in order.
export function suggestNextTurn(entry, peopleNeeded) {
    const group = [YOU, ...entry.friendIds]
    const restedThisTime = group.filter((id) => !entry.goingIds.includes(id))
    return [...restedThisTime, ...entry.goingIds].slice(0, peopleNeeded)
}
