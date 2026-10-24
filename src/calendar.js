// calendar.js builds "add to calendar" links and files for a sign-up.
// Nothing is read from or sent to the student's calendar: the student
// chooses to open the Google link or download the .ics file themselves.
import { sessionEnd } from './formatSession'
import { describeWho, planLabel } from './people'

// Calendars expect times like 20261107T010000Z (UTC, no dashes or colons).
function toUtcStamp(date) {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function eventInfo(cause, entry) {
    const signup = cause.actions.find((action) => action.type === "signup")
    const label = planLabel(signup, entry)
    return {
        title: `${cause.name}: ${label}`,
        details: `Who's going: ${describeWho(entry)}\n\nSession from Moomunity`,
        location: `${signup.area}, Singapore`,
        start: toUtcStamp(new Date(signup.startsAt)),
        end: toUtcStamp(sessionEnd(signup)),
    }
}

// A link that opens Google Calendar with the event already filled in.
export function googleCalendarUrl(cause, entry) {
    const event = eventInfo(cause, entry)
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${event.start}/${event.end}`,
        details: event.details,
        location: event.location,
        ctz: 'Asia/Singapore',
    })
    if (entry.weekly) {
        params.set('recur', repeatRule(entry))
    }
    return `https://calendar.google.com/calendar/render?${params}`
}

// A weekly repeat; a sign-up for a set number of weeks stops after that many sessions.
function repeatRule(entry) {
    return entry.weeks ? `RRULE:FREQ=WEEKLY;COUNT=${entry.weeks}` : 'RRULE:FREQ=WEEKLY'
}

// In .ics files, backslashes, commas, semicolons and new lines must be escaped.
function escapeText(text) {
    return text
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n')
}

// .ics lines must be at most 75 characters; longer lines continue on
// the next line, which starts with a space.
function foldLine(line) {
    const parts = []
    let rest = line
    while (rest.length > 75) {
        parts.push(rest.slice(0, 75))
        rest = ' ' + rest.slice(75)
    }
    parts.push(rest)
    return parts.join('\r\n')
}

// The text of an .ics file, which Apple Calendar, Outlook and Google Calendar can open.
// The format requires CRLF (\r\n) line endings.
export function buildIcs(cause, entry) {
    const event = eventInfo(cause, entry)
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Moomunity//HackIT 2026//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${cause.id}-${event.start}@moomunity.app`,
        `DTSTAMP:${toUtcStamp(new Date())}`,
        `DTSTART:${event.start}`,
        `DTEND:${event.end}`,
        `SUMMARY:${escapeText(event.title)}`,
        `DESCRIPTION:${escapeText(event.details)}`,
        `LOCATION:${escapeText(event.location)}`,
    ]
    if (entry.weekly) {
        lines.push(repeatRule(entry))
    }
    lines.push('END:VEVENT', 'END:VCALENDAR')
    return lines.map(foldLine).join('\r\n') + '\r\n'
}

// Saves the .ics file to the student's device.
export function downloadIcs(cause, entry) {
    const blob = new Blob([buildIcs(cause, entry)], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${cause.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`
    link.click()
    // Free the file from memory once the browser has started the download.
    setTimeout(() => URL.revokeObjectURL(url), 1000)
}
