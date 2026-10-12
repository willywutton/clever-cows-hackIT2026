// freeTime.js checks sessions against the sample timetable in mockCalendar.js,
// and checks whether two sessions overlap. All times are in Singapore time.
import { freeSlots } from './data/mockCalendar'
import { sessionEnd } from './formatSession'

const DAY_FORMAT = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'Asia/Singapore',
})

// Turns a date into { day: "Saturday", minutes: 540 }, where minutes counts from midnight.
function dayAndMinutes(date) {
    const parts = DAY_FORMAT.formatToParts(date)
    const part = (type) => parts.find((p) => p.type === type).value
    return { day: part('weekday'), minutes: Number(part('hour')) * 60 + Number(part('minute')) }
}

// "19:30" becomes 1170.
function toMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
}

// "19:30" becomes "7:30 pm".
function toLabel(time) {
    const [hours, minutes] = time.split(':').map(Number)
    const suffix = hours < 12 ? "am" : "pm"
    return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${suffix}`
}

export function describeSlot(slot) {
    return `${slot.day} ${toLabel(slot.start)} to ${toLabel(slot.end)}, ${slot.reason}`
}

// The free slot a sign-up session fits inside, or undefined if it does not fit.
export function findFreeSlot(action) {
    const start = dayAndMinutes(new Date(action.startsAt))
    const end = dayAndMinutes(sessionEnd(action))
    return freeSlots.find((slot) =>
        slot.day === start.day
        && end.day === start.day
        && start.minutes >= toMinutes(slot.start)
        && end.minutes <= toMinutes(slot.end)
    )
}

// True if a session overlaps one the student has signed up for.
// A weekly sign-up repeats, so it clashes with anything on the same weekday at an
// overlapping time. A one-off sign-up only clashes on its own date.
export function clashesWith(action, signedAction, signedWeekly) {
    const start = new Date(action.startsAt)
    const end = sessionEnd(action)
    const signedStart = new Date(signedAction.startsAt)
    const signedEnd = sessionEnd(signedAction)

    if (!signedWeekly) {
        return start < signedEnd && signedStart < end
    }

    const a = dayAndMinutes(start)
    const b = dayAndMinutes(signedStart)
    const aEnd = a.minutes + action.durationMinutes
    const bEnd = b.minutes + signedAction.durationMinutes
    return a.day === b.day && a.minutes < bEnd && b.minutes < aEnd
}
