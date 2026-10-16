// AddToCalendar.jsx shows the two calendar buttons for one sign-up.
import { downloadIcs, googleCalendarUrl } from './calendar'
import './AddToCalendar.css'

// { cause } and { entry } describe the sign-up.
// { onAdded } is optional: called after either button is used.
function AddToCalendar({ cause, entry, onAdded }) {
    function handleDownload() {
        downloadIcs(cause, entry)
        onAdded?.()
    }

    return (
        <div className="add-to-calendar">
            <a
                className="add-to-calendar-button"
                href={googleCalendarUrl(cause, entry)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onAdded?.()}
            >
                Google Calendar
            </a>
            <button className="add-to-calendar-button" onClick={handleDownload}>
                Download .ics
            </button>
        </div>
    )
}

export default AddToCalendar
