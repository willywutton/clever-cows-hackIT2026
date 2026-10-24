// people.js holds small helpers for describing who is going to a session.
// A sign-up entry (kept in App's signedUp list) looks like:
//   { causeId, weekly, weeks, mode, friendIds, goingIds, calendarAnswered }
//   weeks      for a weekly sign-up, how many weeks it lasts, or null if it carries on
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

// The plan's name: the session's one-off or weekly label, or a set run of weeks.
export function planLabel(signup, entry) {
    if (!entry.weekly) {
        return signup.label
    }
    return entry.weeks ? `Try it for ${entry.weeks} weeks` : signup.weeklyLabel
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

// Who goes each week: the first week is the group's own pick; after that,
// whoever sat out goes next (the same rule as suggestNextTurn above).
export function relayWeeks(group, firstGoing, needed, weeks) {
    const rota = [firstGoing]
    for (let i = 1; i < weeks; i++) {
        const last = rota[i - 1]
        const rested = group.filter((id) => !last.includes(id))
        rota.push([...rested, ...last].slice(0, needed))
    }
    return rota
}
