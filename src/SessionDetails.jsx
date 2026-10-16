// SessionDetails.jsx shows when and where a sign-up session is,
// with a "Near you" tag when it is in the student's part of Singapore.
import { formatSession } from './formatSession'
import './SessionDetails.css'

// { action } is a cause's sign-up action. { weekly } shows "Every week from".
// { userRegion } is the student's optional region from About you ('' if not answered).
function SessionDetails({ action, weekly, userRegion }) {
    const nearYou = userRegion !== '' && userRegion === action.region

    return (
        <ul className="session-details">
            <li>
                <span aria-hidden="true">📅</span>
                {weekly ? `Every week from ${formatSession(action)}` : formatSession(action)}
            </li>
            <li>
                <span aria-hidden="true">📍</span>
                {action.area} ({action.region})
                {nearYou && <span className="session-near">Near you</span>}
            </li>
        </ul>
    )
}

export default SessionDetails
