// formatSession.js turns a sign-up action's date into readable text,
// e.g. "Saturday, 7 November, 9:00 am to 10:00 am".
// Times are always shown in Singapore time, wherever the viewer is.

const TIME_ZONE = 'Asia/Singapore'

export function sessionEnd(action) {
    return new Date(new Date(action.startsAt).getTime() + action.durationMinutes * 60 * 1000)
}

export function formatSession(action) {
    const start = new Date(action.startsAt)
    const day = start.toLocaleDateString('en-SG', {
        weekday: 'long', day: 'numeric', month: 'long', timeZone: TIME_ZONE,
    })
    const timeOptions = { hour: 'numeric', minute: '2-digit', timeZone: TIME_ZONE }
    const from = start.toLocaleTimeString('en-SG', timeOptions)
    const to = sessionEnd(action).toLocaleTimeString('en-SG', timeOptions)
    return `${day}, ${from} to ${to}`
}
