import { causeLook } from './causeColors'
import './EventTile.css'

function EventTile({ event, cause, onOpen }) {
    const start = new Date(event.startsAt)
    const day = start.toLocaleDateString('en-SG', { day: 'numeric', timeZone: 'Asia/Singapore' })
    const month = start.toLocaleDateString('en-SG', { month: 'short', timeZone: 'Asia/Singapore' })
    const weekday = start.toLocaleDateString('en-SG', { weekday: 'short', timeZone: 'Asia/Singapore' })
    const time = start.toLocaleTimeString('en-SG', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Singapore' })

    return (
        <article className="event-tile lift" style={{ '--cause-color': causeLook(cause.id).color }}>
            <div className="event-tile-date" aria-hidden="true">
                <span className="event-tile-month">{month}</span>
                <span className="event-tile-day">{day}</span>
                <span className="event-tile-weekday">{weekday}</span>
            </div>
            <div className="event-tile-body">
                <h4>
                    <button className="event-tile-open" onClick={() => onOpen(cause.id)}>{event.title}</button>
                </h4>
                <p className="event-tile-meta">{cause.name}</p>
                <p className="event-tile-meta">{time} · {event.place}</p>
            </div>
        </article>
    )
}

export default EventTile
