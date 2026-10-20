// SessionDetails.jsx shows when and where a sign-up session is,
// with a tag saying roughly how far it is from the student (see travel.js).
import Graphic from './Graphic'
import { formatSession } from './formatSession'
import { travelLabel } from './travel'
import './SessionDetails.css'

// { action } is a cause's sign-up action. { weekly } shows "Every week from".
// { userRegion } is the student's optional region from About you ('' if not answered).
function SessionDetails({ action, weekly, userRegion }) {
    const travel = travelLabel(userRegion, action.region)

    return (
        <ul className="session-details">
            <li>
                <span aria-hidden="true"><Graphic symbol="calendar"/></span>
                {weekly ? `Every week from ${formatSession(action)}` : formatSession(action)}
            </li>
            <li>
                <span aria-hidden="true"><Graphic symbol="pin"/></span>
                {action.area} ({action.region})
                {travel && <span className={`session-travel session-travel-${travel.level}`}>{travel.text}</span>}
            </li>
        </ul>
    )
}

export default SessionDetails
