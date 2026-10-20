import Graphic from './Graphic'
import { causeLook } from './causeColors'
import { sessionOf, spotsFor } from './causeRows'
import { travelLabel } from './travel'
import CowAvatar from './CowAvatar'
import { joinNames } from './people'
import './CauseTile.css'

function shortDate(startsAt) {
    return new Date(startsAt).toLocaleDateString('en-SG', {
        weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Singapore',
    })
}

function CauseTile({ cause, entry, friends = [], userRegion, note, onOpen }) {
    const look = causeLook(cause.id)
    const session = sessionOf(cause)
    const travel = travelLabel(userRegion, session.region)
    const { going, total } = spotsFor(cause, entry)

    return (
        <article className="cause-tile lift" style={{ '--cause-color': look.color }}>
            <div className="cause-tile-art" aria-hidden="true">
                <span><Graphic symbol={look.emoji}/></span>
            </div>
            {entry && <p className="cause-tile-badge">✓ You're going</p>}

            <div className="cause-tile-body">
                <h4>
                    <button className="cause-tile-open" onClick={() => onOpen(cause.id)}>{cause.name}</button>
                </h4>
                <p className="cause-tile-meta">{shortDate(session.startsAt)} · {session.area}</p>
                {travel && <span className={`cause-tile-travel cause-tile-travel-${travel.level}`}>{travel.text}</span>}

                <div className="cause-tile-spots">
                    <div
                        className="cause-tile-meter"
                        role="meter"
                        aria-valuemin={0}
                        aria-valuemax={total}
                        aria-valuenow={going}
                        aria-label={`${going} of ${total} places taken`}
                    >
                        <span style={{ width: `${(going / total) * 100}%` }}/>
                    </div>
                    <span className="cause-tile-count"><strong>{going}/{total}</strong> going</span>
                </div>

                {friends.length > 0 && (
                    <p className="cause-tile-friends">
                        <span className="cause-tile-faces">
                            {friends.slice(0, 3).map((friend) => (
                                <CowAvatar key={friend.id} accessories={friend.accessories} size="tiny" label={`${friend.name}'s cow`}/>
                            ))}
                        </span>
                        {joinNames(friends.map((friend) => friend.name))} {friends.length === 1 ? "is" : "are"} going
                    </p>
                )}

                {note && <p className="cause-tile-note">✓ {note}</p>}
            </div>
        </article>
    )
}

export default CauseTile
