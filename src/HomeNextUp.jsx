// HomeNextUp.jsx is a one-line reminder of the soonest session, shown at the top of Home.
// It shows nothing until the student has signed up for something.
import { hostedUpcoming, upcomingSessions } from './upcoming'
import { formatSession } from './formatSession'
import './HomeNextUp.css'

// { signedUp } is App's list of sign-ups. { onSeeAll } opens the Profile.
// { events } include approved events the student hosts; whichever is sooner is shown.
function HomeNextUp({ signedUp, events = [], onSeeAll }) {
    const next = upcomingSessions(signedUp)[0]
    const hosting = hostedUpcoming(events)[0]
    if (!next && !hosting) {
        return null
    }
    if (hosting && (!next || new Date(hosting.startsAt) < new Date(next.signup.startsAt))) {
        return (
            <div className="home-next-up">
                <p>
                    <strong>Next up:</strong> you're hosting {hosting.title}, {formatSession({ durationMinutes: 120, ...hosting })}, {hosting.place}
                </p>
                <button onClick={onSeeAll}>See all</button>
            </div>
        )
    }

    return (
        <div className="home-next-up">
            <p>
                <strong>Next up:</strong> {next.cause.name}, {formatSession(next.signup)}, {next.signup.area}
            </p>
            <button onClick={onSeeAll}>See all</button>
        </div>
    )
}

export default HomeNextUp
