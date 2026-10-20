// NextUp.jsx lists the student's upcoming sessions on their Profile,
// each with its calendar buttons.
import { hostedUpcoming, upcomingSessions } from './upcoming'
import { causes } from './data/causes'
import { organisationOfCause } from './data/organisations'
import { formatSession } from './formatSession'
import { describeWho, joinNames, nameOf, suggestNextTurn } from './people'
import SessionDetails from './SessionDetails'
import AddToCalendar from './AddToCalendar'
import './NextUp.css'

// { signedUp } is App's list of sign-ups. { userRegion } is for the travel tag.
// { onReflect } opens the reflection screen for a cause. { events } include approved events the student hosts.
function NextUp({ signedUp, events = [], userRegion, onReflect }) {
    const sessions = upcomingSessions(signedUp)
    const hosting = hostedUpcoming(events)

    return (
        <section className="card next-up">
            <h3>Next up</h3>

            {hosting.map((event) => (
                <div className="next-up-item" key={event.id}>
                    <span className="next-up-badge">You're hosting</span>
                    <strong>{event.title}</strong>
                    <p className="next-up-who">
                        {organisationOfCause(event.causeId).name} · {causes.find((c) => c.id === event.causeId).name}
                    </p>
                    <p className="next-up-who">{formatSession({ durationMinutes: 120, ...event })} · {event.place}</p>
                    <p className="next-up-who">
                        {event.cohostIds && event.cohostIds.length > 0 ? `With ${joinNames(event.cohostIds.map(nameOf))} · ` : ""}
                        {event.spots ? `${event.spots} people needed` : ""}
                    </p>
                </div>
            ))}

            {sessions.length === 0 && hosting.length === 0 && (
                <p className="next-up-empty">Nothing coming up. Find your next cause on Home.</p>
            )}

            {sessions.map(({ entry, cause, signup }) => (
                <div className="next-up-item" key={cause.id}>
                    <strong>{cause.name}: {entry.weekly ? signup.weeklyLabel : signup.label}</strong>
                    <SessionDetails action={signup} weekly={entry.weekly} userRegion={userRegion}/>
                    <p className="next-up-who">{describeWho(entry)}</p>
                    {entry.weekly && entry.mode === "relay" && (
                        <p className="next-up-who">
                            Suggested next turn: {joinNames(suggestNextTurn(entry, signup.peopleNeeded).map(nameOf))}
                        </p>
                    )}
                    <AddToCalendar cause={cause} entry={entry}/>
                    <button className="next-up-went" onClick={() => onReflect(cause.id)}>
                        I went to this session
                    </button>
                </div>
            ))}
        </section>
    )
}

export default NextUp
