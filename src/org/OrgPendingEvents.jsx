// OrgPendingEvents.jsx lists events students have proposed for this cause,
// with a button to approve each one so it shows on the cause page.
import EventCard from '../EventCard'
import './OrgPendingEvents.css'

// { events } are this cause's student-proposed events. { onApprove } approves one by id.
function OrgPendingEvents({ events, onApprove }) {
    const pending = events.filter((event) => event.status === "pending")

    return (
        <section className="card org-pending">
            <h3>Events proposed by students</h3>
            {pending.length === 0 && <p className="org-pending-empty">No proposals waiting right now.</p>}
            {pending.map((event) => (
                <div key={event.id} className="org-pending-item">
                    <EventCard event={event}/>
                    <button className="org-approve" onClick={() => onApprove(event.id)}>Approve</button>
                </div>
            ))}
        </section>
    )
}

export default OrgPendingEvents
