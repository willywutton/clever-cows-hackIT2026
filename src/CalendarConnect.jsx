// CalendarConnect.jsx is the "Connect calendar (demo)" card on Home.
// It uses the sample timetable in mockCalendar.js; no real calendar is read.
import './CalendarConnect.css'

// { connected } and { fitsMyWeek } come from App, with functions to change them.
function CalendarConnect({ connected, fitsMyWeek, onConnect, onDisconnect, onFitsChange }) {
    return (
        <div className="calendar-connect card">
            <p className="calendar-connect-demo">Demo</p>

            {!connected && (
                <>
                    <p>See which sessions fit around your week.</p>
                    <p className="calendar-connect-note">
                        Uses a sample timetable. Nothing is read from your real calendar.
                    </p>
                    <button className="calendar-connect-button" onClick={onConnect}>
                        <span aria-hidden="true">📅</span> Connect calendar (demo)
                    </button>
                </>
            )}

            {connected && (
                <>
                    <p><span aria-hidden="true">✓</span> Sample timetable connected</p>
                    <label className="calendar-connect-switch">
                        <span>Fits my week</span>
                        <input
                            type="checkbox"
                            role="switch"
                            checked={fitsMyWeek}
                            onChange={(event) => onFitsChange(event.target.checked)}
                        />
                    </label>
                    <button className="calendar-connect-disconnect" onClick={onDisconnect}>Disconnect</button>
                </>
            )}
        </div>
    )
}

export default CalendarConnect
