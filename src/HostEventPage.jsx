// HostEventPage.jsx is the Host your own event page: a short checklist, the form
// for proposing an event, and the events the student has proposed so far.
import { causes } from './data/causes'
import { organisationOfCause } from './data/organisations'
import { joinNames, nameOf } from './people'
import PageTitle from './PageTitle'
import HostEventForm from './HostEventForm'
import EventCard from './EventCard'
import './HostEventPage.css'

const STEPS = [
    "Pick the organisation and programme, and check your idea helps in the way they need.",
    "Choose a time, and a place that's easy for everyone to reach.",
    "Say how many people you need, and invite friends to co-host so no one does it alone.",
    "Think about what to bring and any safety rules.",
]

// { events } is every event. { friendIds } are friends who can co-host. { onHost } adds the student's new event.
function HostEventPage({ events, friendIds, onHost }) {
    const mine = events.filter((event) => event.source === "student")

    return (
        <div className="host-page">
            <PageTitle
                title="Host your own event"
                subtitle="Got an idea? Propose it to an organisation for one of its programmes, and they can approve it."
            />

            <div className="host-page-columns">
                <HostEventForm onSubmit={onHost} friendIds={friendIds}/>

                <aside className="card host-steps">
                    <h3>Before you send it</h3>
                    <ol>
                        {STEPS.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                </aside>
            </div>

            {mine.length > 0 && (
                <section className="host-mine">
                    <h3>Your events</h3>
                    {[...mine].reverse().map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            causeName={`${organisationOfCause(event.causeId).name} · ${causes.find((c) => c.id === event.causeId).name}`}
                        >
                            <p className="host-mine-meta">
                                {event.status === "approved"
                                    ? "✓ Approved. It's in your Next up."
                                    : `Waiting for ${organisationOfCause(event.causeId).name} to approve it.`}
                                {event.spots ? ` · ${event.spots} people needed` : ""}
                                {event.cohostIds && event.cohostIds.length > 0 ? ` · Co-hosting with ${joinNames(event.cohostIds.map(nameOf))}` : ""}
                            </p>
                        </EventCard>
                    ))}
                </section>
            )}
        </div>
    )
}

export default HostEventPage
