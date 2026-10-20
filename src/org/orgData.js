import { sampleSignupsFor } from '../data/signups'
import { sessionHours } from '../data/economy'
import { sessionOf } from '../causeRows'
import { describeWho } from '../people'

export const TRAIT_TIPS = {
    Heart: { name: "Guardians", tip: "Give them time with the people you support, like chatting, walking or reading together." },
    Strategy: { name: "Architects", tip: "Let them plan, organise supplies or run sign-in on the day." },
    Community: { name: "Anchors", tip: "Ask them to welcome first-timers or bring a friend next time." },
    Craft: { name: "Builders", tip: "Give them hands-on jobs: setting up, fixing or making things." },
}

export function statusOf(attended) {
    if (attended === 0) {
        return { id: "new", label: "Not been yet" }
    }
    if (attended === 1) {
        return { id: "first", label: "First visit done" }
    }
    return { id: "returning", label: "Came back" }
}

export function volunteersFor(cause, app) {
    const thankedIds = app.thanks.filter((t) => t.causeId === cause.id).map((t) => t.personId)
    const rows = sampleSignupsFor(cause.id).map((person) => ({
        ...person,
        attended: person.timesAttended + (app.sampleAttendance[person.id] || 0),
        sample: true,
    }))
    const entry = app.signedUp.find((item) => item.causeId === cause.id)
    if (entry) {
        rows.push({
            id: "student",
            name: `${app.profile.name || "Student"} (demo student)`,
            weekly: entry.weekly,
            attended: app.attendance.filter((visit) => visit.causeId === cause.id).length,
            trait: app.quizResult,
            who: describeWho(entry),
            sample: false,
        })
    }
    return rows.map((row) => ({ ...row, status: statusOf(row.attended), thanked: thankedIds.includes(row.id) }))
}

export function orgStats(cause, rows) {
    const hours = sessionHours(sessionOf(cause))
    const attendedOnce = rows.filter((row) => row.attended >= 1)
    const returning = rows.filter((row) => row.attended >= 2)
    return {
        volunteers: rows.length,
        returningRate: attendedOnce.length ? Math.round((returning.length / attendedOnce.length) * 100) : 0,
        returning: returning.length,
        attendedOnce: attendedOnce.length,
        hours: rows.reduce((sum, row) => sum + row.attended * hours, 0),
        toThank: rows.filter((row) => row.attended === 1 && !row.thanked),
    }
}

export function traitMix(rows) {
    const counts = { Heart: 0, Strategy: 0, Community: 0, Craft: 0 }
    rows.forEach((row) => {
        if (counts[row.trait] !== undefined) {
            counts[row.trait] += 1
        }
    })
    return Object.entries(counts)
        .map(([trait, count]) => ({ trait, count, share: rows.length ? Math.round((count / rows.length) * 100) : 0 }))
        .sort((a, b) => b.count - a.count)
}
