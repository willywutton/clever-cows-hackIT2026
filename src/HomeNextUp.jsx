// HomeNextUp.jsx is a one-line reminder of the soonest session, shown at the top of Home.
// It shows nothing until the student has signed up for something.
import { upcomingSessions } from './upcoming'
import { formatSession } from './formatSession'
import './HomeNextUp.css'

// { signedUp } is App's list of sign-ups. { onSeeAll } opens the Profile.
function HomeNextUp({ signedUp, onSeeAll }) {
    const next = upcomingSessions(signedUp)[0]
    if (!next) {
        return null
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
