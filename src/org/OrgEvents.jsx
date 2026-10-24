import { useState } from 'react'
import HostEventForm from '../HostEventForm'
import EventCard from '../EventCard'
import Graphic from '../Graphic'
import { formatSession } from '../formatSession'
import OrgPendingEvents from './OrgPendingEvents'
import './OrgEvents.css'

const TIPS = [
    "Use a title that says what volunteers will do, like \"Bike tune-up day\".",
    "Short sessions of 1 to 2 hours are easiest for first-timers to say yes to.",
    "Say what to bring and what's provided, so no one feels unprepared.",
    "Add a picture: events with one stand out on students' Home page.",
]

function OrgEvents({ app, cause, pending, followers, onGo }) {
    const [adding, setAdding] = useState(false)
    const [addedId, setAddedId] = useState(null)
    const upcoming = app.events
        .filter((event) => event.causeId === cause.id && event.status === "approved")
        .sort((a, b) => (a.startsAt < b.startsAt ? -1 : 1))
    const added = app.events.find((event) => event.id === addedId)

    function handleAdd(details) {
        setAddedId(app.addOrgEvent(details))
        setAdding(false)
    }

    function openForm() {
        setAddedId(null)
        setAdding(true)
    }

    return (
        <>
            <div className="org-section-head">
                <div>
                    <h2>Events</h2>
                    <p className="org-section-note">Events show on {cause.name}'s page and in students' "Coming up" row on Home.</p>
                </div>
                {!adding && <button className="button-primary" onClick={openForm}>+ Add an event</button>}
            </div>

            {adding && (
                <section className="org-section org-events-add">
                    <div className="org-section-head">
                        <h3>New event for {cause.name}</h3>
                        <button className="org-link" onClick={() => setAdding(false)}>Cancel</button>
                    </div>
                    <div className="org-events-add-columns">
                        <HostEventForm fixedCauseId={cause.id} submitLabel="Add event" onSubmit={handleAdd}/>
                        <aside className="card org-events-tips">
                            <h4><Graphic symbol="bulb"/> Tips for an event students join</h4>
                            <ul>
                                {TIPS.map((tip) => <li key={tip}>{tip}</li>)}
                            </ul>
                        </aside>
                    </div>
                </section>
            )}

            {added && (
                <section className="card org-events-added" role="status">
                    <div className="org-events-added-head">
                        <span className="org-events-added-check" aria-hidden="true">✓</span>
                        <div>
                            <h3>"{added.title}" is live</h3>
                            <p>{formatSession({ durationMinutes: 120, ...added })} · {added.place}</p>
                        </div>
                        <button className="org-link" onClick={() => setAddedId(null)}>Dismiss</button>
                    </div>
                    <ol className="org-events-steps">
                        <li className="org-events-step-done">
                            <span aria-hidden="true">✓</span>
                            <p><strong>Students can see it now</strong> on {cause.name}'s page and in their "Coming up" row on Home.</p>
                        </li>
                        <li>
                            <span aria-hidden="true">2</span>
                            <p><strong>Tell your {followers} followers.</strong> An update reaches them through Clover on their Home page.</p>
                            <button onClick={() => onGo("updates", cause.id)}>Post an update</button>
                        </li>
                        <li>
                            <span aria-hidden="true">3</span>
                            <p><strong>After the event, mark who came</strong> so their hours count, and say thanks to first-timers so they come back.</p>
                            <button onClick={() => onGo("volunteers", cause.id)}>Go to Volunteers</button>
                        </li>
                    </ol>
                </section>
            )}

            <OrgPendingEvents events={pending} onApprove={app.approveEvent}/>

            <section className="org-section">
                <h3>Upcoming ({upcoming.length})</h3>
                {upcoming.length === 0 && <p className="org-section-note">No events yet. Add one so students have something to join.</p>}
                <div className="org-events-list">
                    {upcoming.map((event) => (
                        <div key={event.id} className={event.id === addedId ? "org-events-new" : undefined}>
                            <EventCard event={event}/>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default OrgEvents
