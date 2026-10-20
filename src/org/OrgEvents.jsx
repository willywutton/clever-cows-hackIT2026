import { useState } from 'react'
import HostEventForm from '../HostEventForm'
import EventCard from '../EventCard'
import OrgPendingEvents from './OrgPendingEvents'
import './OrgEvents.css'

function OrgEvents({ app, cause, pending }) {
    const [adding, setAdding] = useState(false)
    const upcoming = app.events
        .filter((event) => event.causeId === cause.id && event.status === "approved")
        .sort((a, b) => (a.startsAt < b.startsAt ? -1 : 1))

    function handleAdd(details) {
        app.addOrgEvent(details)
        setAdding(false)
    }

    return (
        <>
            <div className="org-section-head">
                <div>
                    <h2>Events</h2>
                    <p className="org-section-note">Events show on your cause page and in students' "Coming up" row on Home.</p>
                </div>
                {!adding && <button className="button-primary" onClick={() => setAdding(true)}>+ Add an event</button>}
            </div>

            {adding && (
                <section className="org-section org-events-add">
                    <div className="org-section-head">
                        <h3>New event</h3>
                        <button className="org-link" onClick={() => setAdding(false)}>Cancel</button>
                    </div>
                    <HostEventForm fixedCauseId={cause.id} submitLabel="Add event" onSubmit={handleAdd}/>
                </section>
            )}

            <OrgPendingEvents events={pending} onApprove={app.approveEvent}/>

            <section className="org-section">
                <h3>Upcoming ({upcoming.length})</h3>
                {upcoming.length === 0 && <p className="org-section-note">No events yet. Add one so students have something to join.</p>}
                <div className="org-events-list">
                    {upcoming.map((event) => <EventCard key={event.id} event={event}/>)}
                </div>
            </section>
        </>
    )
}

export default OrgEvents
