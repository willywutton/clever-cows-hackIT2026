// EventCard.jsx shows one event: when and where, what it is, an optional photo,
// and labels for sample events and events still waiting for approval.
import { formatSession } from './formatSession'
import './EventCard.css'

// { event } is an event from events.js or one added in the app.
// { saved } and { onToggleSave } show a Save button when given.
// { causeName } is shown when the card appears away from its cause page.
function EventCard({ event, saved, onToggleSave, causeName }) {
    const pending = event.status === "pending"

    return (
        <article className={pending ? "event-card event-card-pending" : "event-card"}>
            {event.photoUrl && <img className="event-card-photo" src={event.photoUrl} alt={`Picture for ${event.title}`}/>}
            <div className="event-card-body">
                <div className="event-card-tags">
                    {event.sample && <span className="event-tag">Sample</span>}
                    {pending && <span className="event-tag event-tag-pending">Pending</span>}
                    {event.source === "student" && !pending && <span className="event-tag">Student-hosted</span>}
                </div>
                <h4 className="event-card-title">{event.title}</h4>
                {causeName && <p className="event-card-cause">{causeName}</p>}
                <p className="event-card-meta">
                    <span aria-hidden="true">📅</span> {formatSession({ durationMinutes: 120, ...event })}
                </p>
                {event.place && (
                    <p className="event-card-meta"><span aria-hidden="true">📍</span> {event.place}</p>
                )}
                {event.description && <p className="event-card-description">{event.description}</p>}
                {event.host && <p className="event-card-host">Hosted by {event.host}</p>}
            </div>
            {onToggleSave && !pending && (
                <button
                    className="event-card-save"
                    aria-pressed={saved}
                    onClick={onToggleSave}
                >
                    {saved ? "★ Saved" : "☆ Save"}
                </button>
            )}
        </article>
    )
}

export default EventCard
