// CalendarConnect.jsx is the "Connect calendar (demo)" card in Profile. Once connected,
// the "Fits my week" filter on Home unlocks. It uses the sample timetable in
// mockCalendar.js; no real calendar is read.
import Graphic from './Graphic'
import './CalendarConnect.css'

// { connected } comes from App, with { onConnect } and { onDisconnect } to change it.
function CalendarConnect({ connected, onConnect, onDisconnect }) {
    return (
        <section className="calendar-connect card">
            <h3><span aria-hidden="true"><Graphic symbol="calendar"/></span> Calendar</h3>

            {!connected && (
                <>
                    <p>Connect your calendar to unlock "Fits my week" on Home.</p>
                    <button className="calendar-connect-button" onClick={onConnect}>Connect calendar</button>
                </>
            )}

            {connected && (
                <>
                    <p><span aria-hidden="true">✓</span> Calendar connected. "Fits my week" is unlocked on Home.</p>
                    <button className="calendar-connect-disconnect" onClick={onDisconnect}>Disconnect</button>
                </>
            )}
        </section>
    )
}

export default CalendarConnect
